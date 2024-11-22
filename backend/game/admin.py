from django.contrib import admin
from .models import GameSession
# from .models import GameSession, PlayerPaddle, Ball

# @admin.register(GameSession)
# class GameSessionAdmin(admin.ModelAdmin):
#     list_display = ('player_1', 'player_2', 'is_active', 'created_at')

# @admin.register(PlayerPaddle)
# class PlayerPaddleAdmin(admin.ModelAdmin):
#     list_display = ('game_session', 'player', 'paddle_position')

# @admin.register(Ball)
# class BallAdmin(admin.ModelAdmin):
#     list_display = ('game_session', 'position_x', 'position_y', 'velocity_x', 'velocity_y')


# Register your models here.
admin.site.register(GameSession)