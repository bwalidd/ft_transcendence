from rest_framework import permissions as rest_permissions
from rest_framework import decorators as rest_decorators
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import MychatModel
from django.db.models import Q

@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def get_chat_messages(request, user_id, friend_id):
    # Ensure the logged-in user is either `user_id` or `friend_id`
    if request.user.id not in [user_id, friend_id]:
        return Response({'error': 'Unauthorized access'}, status=403)

    # Query for a chat record between `user_id` and `friend_id`
    chat_record = MychatModel.objects.filter(
        (Q(me_id=user_id) & Q(frnd_id=friend_id)) |
        (Q(me_id=friend_id) & Q(frnd_id=user_id))
    ).first()

    if chat_record:
        messages = chat_record.chats  # Retrieve the messages from the `chats` JSON field
    else:
        messages = []

    # Return the chat messages as JSON response
    return Response({'messages': messages})
