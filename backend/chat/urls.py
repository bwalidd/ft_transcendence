from django.urls import path
from .views import chat_view

urlpatterns = [
    path('chatView/', chat_view, name='chat_view'),
]
