from django.urls import path
from . import consumers

websocket_urlpatterns = [
    # path("ws/game/<int:user_id>/<int:friend_id>/", consumers.GameConsumer.as_asgi()),
]
