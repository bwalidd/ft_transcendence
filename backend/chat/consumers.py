# chat/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import MychatModel
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = int(self.scope['url_route']['kwargs']['user_id'])
        self.friend_id = int(self.scope['url_route']['kwargs']['friend_id'])
        
        # Create a unique room group for the chat
        self.room_group_name = f'chat_{min(self.user_id, self.friend_id)}_{max(self.user_id, self.friend_id)}'
        
        print(f"User {self.user_id} connected to chat with {self.friend_id}")

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

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

