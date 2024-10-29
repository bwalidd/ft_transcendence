# chat/routing.py

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/wsc/<int:user_id>/<int:friend_id>/', consumers.ChatConsumer.as_asgi()),
]
