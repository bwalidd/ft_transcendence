from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/wsc/', consumers.ChatConsumer.as_asgi()),  # For direct chat
]
