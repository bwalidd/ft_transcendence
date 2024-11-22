# urls.py
from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('start/', views.start_game, name='start_game'),
]
