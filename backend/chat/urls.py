from django.urls import path
from . import views

app_name = 'chat' 

urlpatterns = [
    path('create_or_get/', views.create_or_get_chat, name='create_or_get_chat'),
]
