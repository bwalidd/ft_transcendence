from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import GameSession

def create_game(request):
    # Assume player_1 is the logged-in user
    game = GameSession.objects.create(player_1=request.user)
    return JsonResponse({'game_id': game.id})

def join_game(request, game_id):
    game = get_object_or_404(GameSession, id=game_id)
    if not game.player_2:
        game.player_2 = request.user
        game.save()
    return JsonResponse({'game_id': game.id})
