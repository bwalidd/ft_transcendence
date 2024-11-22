# serializers.py
from rest_framework import serializers
from .models import GameSession

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['session_id', 'player_one', 'player_two', 'score_player_1', 'score_player_2', 'created_at']
        read_only_fields = ['session_id', 'created_at']  # 'session_id' and 'created_at' are auto-generated
