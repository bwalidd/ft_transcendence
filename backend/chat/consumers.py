import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from .models import Chat, ChatMessage

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f'chat_{self.chat_id}'

        # Check if the chat exists asynchronously
        chat = await self.get_chat(self.chat_id)
        if not chat:
            await self.close()
            return

        # Join the chat group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the chat group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data.get('message')
            sender_id = data.get('sender_id')

            # Validate message and sender
            if not message or not sender_id:
                return await self.send(text_data=json.dumps({
                    'error': 'Invalid message or sender ID.'
                }))

            # Use async versions of get_user and get_chat
            sender = await self.get_user(sender_id)
            chat = await self.get_chat(self.chat_id)

            # Validate sender and chat
            if not sender:
                return await self.send(text_data=json.dumps({
                    'error': 'Sender does not exist.'
                }))
            if not chat:
                return await self.send(text_data=json.dumps({
                    'error': 'Chat does not exist.'
                }))

            # Check if the sender is a participant
            is_participant = await self.is_chat_participant(chat, sender)
            if not is_participant:
                return await self.send(text_data=json.dumps({
                    'error': 'You are not a participant in this chat.'
                }))

            # Create and save the chat message asynchronously
            chat_message = await self.create_chat_message(sender, message, chat)

            # Broadcast the message to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': chat_message.content,
                    'sender': sender.username,
                    'timestamp': str(chat_message.timestamp)
                }
            )
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'error': 'Invalid JSON format.'
            }))
        except Exception as e:
            await self.send(text_data=json.dumps({
                'error': f'An error occurred: {str(e)}'
            }))

    async def chat_message(self, event):
        # Send the message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp']
        }))

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def get_chat(self, chat_id):
        try:
            return Chat.objects.get(id=chat_id)
        except Chat.DoesNotExist:
            return None

    @database_sync_to_async
    def is_chat_participant(self, chat, user):
        return chat.participants.filter(id=user.id).exists()

    @database_sync_to_async
    def create_chat_message(self, sender, message, chat):
        # Create and save the chat message
        chat_message = ChatMessage.objects.create(sender=sender, content=message)
        chat.messages.add(chat_message)  # Adding the message to the chat asynchronously
        return chat_message
