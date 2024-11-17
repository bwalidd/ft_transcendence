import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import MychatModel
from django.contrib.auth import get_user_model

User = get_user_model()

# In-memory dictionary to track online users in room groups
# This is a simplified example; in production, consider using a persistent cache
active_connections = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = int(self.scope['url_route']['kwargs']['user_id'])
        self.friend_id = int(self.scope['url_route']['kwargs']['friend_id'])
        
        # Create a unique room group for the chat
        self.room_group_name = f'chat_{min(self.user_id, self.friend_id)}_{max(self.user_id, self.friend_id)}'
        
        print(f"User {self.user_id} connected to chat with {self.friend_id}")

        # Initialize room group in active connections if not present
        if self.room_group_name not in active_connections:
            active_connections[self.room_group_name] = set()

        # Add current user to the active connections for the room group
        active_connections[self.room_group_name].add(self.user_id)

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f"---->user {self.user_id} connected with {self.friend_id} on {self.room_group_name}")

        # Check if both users are online
        await self.notify_online_status()

    async def disconnect(self, close_code):
        # Remove user from active connections for the room group
        if self.room_group_name in active_connections:
            active_connections[self.room_group_name].discard(self.user_id)
            if not active_connections[self.room_group_name]:  # Remove empty room group
                del active_connections[self.room_group_name]

        # Notify the friend that this user is offline
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_status',
                'status': 'offline',
                'user_id': self.user_id
            }
        )

        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"---->user {self.user_id} disconnected with {self.friend_id} on {self.room_group_name}")
        
        # Check if both users are still online
        await self.notify_online_status()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['msg']

        # Save the message in the database
        await self.save_chat_message(self.user_id, self.friend_id, message)

        # Send message to room group, notifying only the group members
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'msg': message,
                'sender': self.user_id  # Include sender info
            }
        )

    async def chat_message(self, event):
        message = event['msg']
        sender = event['sender']

        # Send message to WebSocket only if it's not the sender
        if sender != self.user_id:
            await self.send(text_data=json.dumps({
                'msg': message
            }))

    async def user_status(self, event):
        # Send online/offline status to WebSocket
        status = event['status']
        user_id = event['user_id']
        await self.send(text_data=json.dumps({
            'type': 'status',
            'status': status,
            'user_id': user_id
        }))

    @database_sync_to_async
    def save_chat_message(self, user_id, friend_id, message):
        chat, created = MychatModel.objects.get_or_create(
            me_id=min(user_id, friend_id),
            frnd_id=max(user_id, friend_id),
            defaults={'chats': []}
        )

        # Append the new message to the chat's JSON field
        chat_data = chat.chats or []
        chat_data.append({'sender': user_id, 'message': message})
        chat.chats = chat_data
        chat.save()

    async def notify_online_status(self):
        # Check if both users are online in the room group
        users_in_room = active_connections.get(self.room_group_name, set())
        both_online = {self.user_id, self.friend_id}.issubset(users_in_room)

        # Notify current user about the friend's online status
        await self.send(text_data=json.dumps({
            'type': 'status',
            'status': 'online' if both_online else 'offline',
            'user_id': self.friend_id
        }))

        # Notify friend about the current user's online status if they are also online
        if both_online:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'user_status',
                    'status': 'online',
                    'user_id': self.user_id
                }
            )


class GameConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        # Extract user_id and friend_id from the URL
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.friend_id = self.scope['url_route']['kwargs']['friend_id']

        print(f"User ID: {self.user_id}, Friend ID: {self.friend_id}")
        self.group_name = f"game_{min(self.user_id, self.friend_id)}_{max(self.user_id, self.friend_id)}"
        
        # Make sure user 12 joins the correct group
        user_group = f"user_{self.user_id}"
        print(f"User {self.user_id} is joining group {user_group}")
        
        # Join the WebSocket group
        await self.channel_layer.group_add(
            user_group,  # Ensure each user joins their own unique group
            self.channel_name
        )
        await self.accept()
        print(f"User {self.user_id} connected to group {user_group}")


    async def disconnect(self, close_code):
        # Ensure that group_name exists before trying to leave the group
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            print(f"User {self.user_id} disconnected from {self.group_name}")
        else:
            print("Group name not set, skipping group discard.")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            recipient_id = data.get('to')
            message = data.get('message')

            if not recipient_id or not message:
                print("Missing recipient or message in received data")
                return

            print(f"--1-->Message from {self.user_id} to {recipient_id}: {message}")

            # Send the message to the recipient's group (user_12 instead of game_11_12)
            to_user_group = f"user_{recipient_id}"
            print(f"---2-->Sending game invitation to group {to_user_group}: {message}")
            await self.channel_layer.group_send(
                to_user_group,  # Send the message to the recipient's group
                {
                    "type": "game_invitation_message",
                    "from": self.user_id,
                    "message": message
                }
            )
        except Exception as e:
            print(f"Error processing received message: {e}")

    async def game_invitation_message(self, event):
        print(f"---3-->Sending game invitation: {event['message']} from {event['from']} to {self.user_id}")
        await self.send(text_data=json.dumps({
            "type": "game_invitation",
            "from": event["from"],
            "message": event["message"]
        }))


