from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import MychatModel
from django.contrib.auth import get_user_model
import json

User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def chat_view(request):
    if request.method == "GET":
        # Fetch chat history
        frnd_username = request.GET.get('user', None)
        if frnd_username:
            frnd = get_object_or_404(User, username=frnd_username)
            # Retrieve chat history
            chat_history = MychatModel.objects.filter(me=request.user, frnd=frnd).values('chats')
            return Response({"chats": list(chat_history)}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Friend username not provided."}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "POST":
        # Send a new message
        frnd_username = request.data.get('user')
        message = request.data.get('message')

        if not frnd_username or not message:
            return Response({"error": "Friend username and message are required."}, status=status.HTTP_400_BAD_REQUEST)

        frnd = get_object_or_404(User, username=frnd_username)

        # Save the message
        chat_entry = MychatModel(me=request.user, frnd=frnd, chats=json.dumps({"message": message}))
        chat_entry.save()

        return Response({"success": "Message sent."}, status=status.HTTP_201_CREATED)
