from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import GameSession
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .models import GameSession
from .serializers import GameSessionSerializer ,GameSessionSerializerDetail

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_game(request):
    """
    Start a new game session between two players.
    """
    try:
        player_one_id = request.data.get("player_one")
        player_two_id = request.data.get("player_two")
        session_id = request.data.get("session_id")
        
        # Validate required fields
        if not all([player_one_id, player_two_id, session_id]):
            return Response(
                {"error": "player_one, player_two, and session_id are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch players from the database
        try:
            player_one = User.objects.get(id=player_one_id)
            player_two = User.objects.get(id=player_two_id)
        except User.DoesNotExist:
            return Response(
                {"error": "One or both players do not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Create a new game session
        game_session = GameSession.objects.create(
            session_id=session_id,
            player_one=player_one,
            player_two=player_two,
        )

        return Response(
            {
                "message": "Game session created successfully.",
                "session_id": str(game_session.session_id),
                "player_one": player_one.username,
                "player_two": player_two.username,
            },
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

 # Ensure you have this serializer defined

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def game_session_detail(request, session_id):
    """
    Retrieve game session details by session ID.
    """
    try:
        # Fetch the game session by session_id
        game_session = GameSession.objects.get(session_id=session_id)
        serializer = GameSessionSerializerDetail(game_session)  # Serialize the game session
        return Response(serializer.data, status=status.HTTP_200_OK)
    except GameSession.DoesNotExist:
        return Response(
            {"error": "Game session not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

