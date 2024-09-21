# Send a friend request
from rest_framework import decorators as rest_decorators
from rest_framework import permissions as rest_permissions
from rest_framework import response, status
from django.shortcuts import get_object_or_404
from .models import friendRequest, friendList
from account.models import Account
from django.views.decorators.csrf import csrf_exempt
import logging

# Create a logger instance
logger = logging.getLogger(__name__)


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def send_friend_request(request, receiver_id):
    # Fetch the receiver (user who will receive the friend request)
    receiver = get_object_or_404(Account, id=receiver_id)
    logger.info(f"Received request: {request.method} to send a friend request to {receiver_id} by {request.user}")
    
    # Check if a friend request already exists
    if friendRequest.objects.filter(sender=request.user, receiver=receiver).exists():
        return response.Response({'detail': 'Friend request already sent.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create a new friend request
    friend_request = friendRequest(sender=request.user, receiver=receiver)
    friend_request.save()

    return response.Response({'detail': 'Friend request sent successfully.'}, status=status.HTTP_201_CREATED)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def check_friend_status(request, user_id):
    """Check the status between the logged-in user and another user."""
    target_user = get_object_or_404(Account, id=user_id)

    if friendList.objects.filter(user=request.user, friends=target_user).exists():
        return response.Response({'status': 'friends'}, status=status.HTTP_200_OK)
    elif friendRequest.objects.filter(sender=request.user, receiver=target_user).exists():
        return response.Response({'status': 'request_sent'}, status=status.HTTP_200_OK)
    elif friendRequest.objects.filter(sender=target_user, receiver=request.user).exists():
        return response.Response({'status': 'request_received'}, status=status.HTTP_200_OK)
    else:
        return response.Response({'status': 'none'}, status=status.HTTP_200_OK)




# Accept a friend request
@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def accept_friend_request(request, request_id):
    friend_request = get_object_or_404(friendRequest, id=request_id)

    if friend_request.receiver == request.user:
        friend_request.accept()
        return response.Response({'detail': 'Friend request accepted.'}, status=status.HTTP_200_OK)
    else:
        return response.Response({'detail': 'Not authorized to accept this request.'}, status=status.HTTP_403_FORBIDDEN)



# Decline or cancel a friend request
@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def decline_friend_request(request, request_id):
    friend_request = get_object_or_404(friendRequest, id=request_id)

    if friend_request.receiver == request.user or friend_request.sender == request.user:
        friend_request.delete()
        return response.Response({'detail': 'Friend request declined.'}, status=status.HTTP_200_OK)
    else:
        return response.Response({'detail': 'Not authorized to decline this request.'}, status=status.HTTP_403_FORBIDDEN)