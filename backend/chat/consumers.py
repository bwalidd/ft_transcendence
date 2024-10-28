import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connecting...")
        await self.accept()
        await self.channel_layer.group_add(f"mychat_app_{self.scope['user']}", self.channel_name)

    
    async def receive(self, text_data):
        text_data = json.dumps(text_data)
        await self.channel_layer.group_send(
            f"mychat_app_{self.scope['user']}",
            {
                "type": "send.msg",
                "msg": text_data['msg']
            },
        )

    async def send_msg(self, event):
        print("------------->",event)
        await self.send(event['msg'])

    async def disconnect(self, close_code):
        pass


    