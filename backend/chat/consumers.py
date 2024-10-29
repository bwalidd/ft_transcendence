# chat/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.friend_id = self.scope['url_route']['kwargs']['friend_id']
        self.room_group_name = f'chat_{min(self.user_id, self.friend_id)}_{max(self.user_id, self.friend_id)}'
        print("connetion between",self.user_id,"and",self.friend_id)

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

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'msg': message
            }
        )

    async def chat_message(self, event):
        message = event['msg']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'msg': message
        }))