from django.shortcuts import render
from django.http import JsonResponse
from .models import Player, Computer

def index(request):
    return render(request, 'hello')

def game_view(request):
    if request.method == 'GET' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Fetch player and computer data from the database
        player = Player.objects.first()
        computer = Computer.objects.first()

        game_data = {
            'player': {
                'x': player.x,
                'y': player.y,
                'width': player.width,
                'height': player.height,
                'color': player.color,
                'score': player.score,
            },
            'computer': {
                'x': computer.x,
                'y': computer.y,
                'width': computer.width,
                'height': computer.height,
                'color': computer.color,
                'score': computer.score,
            }
        }
        return JsonResponse(game_data)

    # Render the HTML for non-AJAX requests
    return render(request, 'hello world')