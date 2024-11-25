import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import GameSession

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract session ID from the URL route
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.room_group_name = f'game_{self.session_id}'

        # Add the WebSocket connection to the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        print(f"WebSocket connected for session: {self.session_id}")

    async def disconnect(self, close_code):
        # Remove WebSocket connection from the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"WebSocket disconnected for session: {self.session_id}")

    async def receive(self, text_data):
        """
        Handle incoming WebSocket messages from clients.
        """
        try:
            data = json.loads(text_data)
            action = data.get('action')

            if action == 'paddle_move':
                # Update paddle position for the corresponding player
                player = data.get('player')  # 'player_one' or 'player_two'
                paddle_y = data.get('paddle_y')

                if player == 'player_one':
                    await self.update_paddle_one(paddle_y)
                elif player == 'player_two':
                    await self.update_paddle_two(paddle_y)

            elif action == 'ball_update':
                # Update ball position and velocity
                await self.update_ball(
                    data.get('ball_x'),
                    data.get('ball_y'),
                    data.get('ball_velocity_x'),
                    data.get('ball_velocity_y'),
                )

            # Broadcast the updated data to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_update',
                    'data': data
                }
            )
        except Exception as e:
            print(f"Error processing WebSocket message: {e}")

    async def game_update(self, event):
        try:
            print("Sending game update:", event['data'])
            await self.send(text_data=json.dumps({
                'action': 'update',
                'data': event['data']  # Send the entire game data
            }))
        except Exception as e:
            print(f"Error sending game update: {e}")

    @sync_to_async
    def update_paddle_one(self, paddle_y):
        """
        Update the paddle position for player one in the database.
        """
        try:
            game_session = GameSession.objects.get(session_id=self.session_id)
            game_session.paddle_one_y = paddle_y
            game_session.save()
        except GameSession.DoesNotExist:
            print(f"GameSession not found for session ID: {self.session_id}")

    @sync_to_async
    def update_paddle_two(self, paddle_y):
        """
        Update the paddle position for player two in the database.
        Constrain paddle position between 0 and canvas height - paddle height.
        """
        try:
            game_session = GameSession.objects.get(session_id=self.session_id)
            paddle_y = max(0, min(paddle_y, 400 - 100))  # Assuming canvas height is 400 and paddle height is 100
            game_session.paddle_two_y = paddle_y
            game_session.save()
        except GameSession.DoesNotExist:
            print(f"GameSession not found for session ID: {self.session_id}")


    @sync_to_async
    def update_ball(self, ball_x, ball_y, ball_velocity_x, ball_velocity_y):
        """
        Update the ball's position and velocity in the database.
        """
        try:
            game_session = GameSession.objects.get(session_id=self.session_id)
            game_session.ball_x = ball_x
            game_session.ball_y = ball_y
            game_session.ball_velocity_x = ball_velocity_x
            game_session.ball_velocity_y = ball_velocity_y
            game_session.save()
        except GameSession.DoesNotExist:
            print(f"GameSession not found for session ID: {self.session_id}")

