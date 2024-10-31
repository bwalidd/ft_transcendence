from django.urls import path
from . import views

app_name = 'chat'


urlpatterns = [
    # Other endpoints...
    path('messages/<int:user_id>/<int:friend_id>/', views.get_chat_messages, name='get_chat_messages'),
]
