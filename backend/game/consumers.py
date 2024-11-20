
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameSession, Ball, PlayerPaddle

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room_group_name = f'game_{self.game_id}'

        # Join the room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')

        # Handle actions (e.g., move paddle, reset ball, etc.)
        if action == 'move_paddle':
            await self.move_paddle(data)
        elif action == 'reset_ball':
            await self.reset_ball(data)

    async def move_paddle(self, data):
        # Broadcast paddle movement to all players
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_update',
                'event': 'move_paddle',
                'player': data['player'],
                'position': data['position'],
            }
        )

    async def reset_ball(self, data):
        # Broadcast ball reset event
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_update',
                'event': 'reset_ball',
            }
        )

    async def game_update(self, event):
        # Send game update to WebSocket
        await self.send(text_data=json.dumps(event))
