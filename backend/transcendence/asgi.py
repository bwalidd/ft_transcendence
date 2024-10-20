"""
ASGI config for transcendence project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import api.routing  # Import your app's routing file for WebSocket URLs

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'transcendence.settings')

# Define the ASGI application to support both HTTP and WebSocket protocols
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Handles HTTP requests
    "websocket": AuthMiddlewareStack(
        URLRouter(
            api.routing.websocket_urlpatterns  # Routes WebSocket connections to the appropriate consumers
        )
    ),
})
