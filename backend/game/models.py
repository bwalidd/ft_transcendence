from django.db import models
from django.conf import settings


class GameSession(models.Model):
    player_1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="games_as_player_1",
        on_delete=models.CASCADE,
    )
    player_2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="games_as_player_2",
        on_delete=models.CASCADE,
    )
    score_player_1 = models.IntegerField(default=0)
    score_player_2 = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Game: {self.player_1.username} vs {self.player_2.username}"

    def reset_ball(self):
        ball = self.ball
        ball.position_x = 50.0
        ball.position_y = 50.0
        ball.velocity_x *= -1  # Switch direction
        ball.velocity_y = 1.0
        ball.save()

    def update_scores(self, player_scored):
        if player_scored == 1:
            self.score_player_1 += 1
        elif player_scored == 2:
            self.score_player_2 += 1
        self.save()


class PlayerPaddle(models.Model):
    game_session = models.ForeignKey(GameSession, on_delete=models.CASCADE)
    player = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    paddle_position = models.FloatField(default=50.0)  # Middle of the play area

    def __str__(self):
        return f"{self.player.username}'s Paddle in {self.game_session}"


class Ball(models.Model):
    game_session = models.OneToOneField(GameSession, on_delete=models.CASCADE)
    position_x = models.FloatField(default=50.0)  # Middle of the play area
    position_y = models.FloatField(default=50.0)  # Middle of the play area
    velocity_x = models.FloatField(default=1.0)  # Initial direction
    velocity_y = models.FloatField(default=1.0)  # Initial direction

    def __str__(self):
        return f"Ball in {self.game_session}"
