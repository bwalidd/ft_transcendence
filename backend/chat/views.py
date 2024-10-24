from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Chat
from django.contrib.auth import get_user_model

Account = get_user_model()

@api_view(['POST'])
@csrf_exempt  # Consider removing this for security reasons and handle CSRF properly
def create_or_get_chat(request):
    user = request.user
    friend_id = request.data.get('friend_id')
    
    if not friend_id:
        return Response({'error': 'Friend ID is required'}, status=400)

    try:
        friend = Account.objects.get(id=friend_id)
    except Account.DoesNotExist:
        return Response({'error': 'Friend not found'}, status=404)

    # Create or get chat without participants
    chat, created = Chat.objects.get_or_create()  # Create a chat instance first

    # Add participants to the chat
    chat.participants.add(user, friend)

    return Response({'chat_id': chat.id})
