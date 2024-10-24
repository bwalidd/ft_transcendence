from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()  # Use the correct user model

class ChatMessage(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='sent_messages'
    )
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:30]}"

    class Meta:
        ordering = ['timestamp']

class Chat(models.Model):
    participants = models.ManyToManyField(User, related_name='chats')
    messages = models.ManyToManyField(ChatMessage, related_name='chats', blank=True)

    def __str__(self):
        return f"Chat between: {', '.join([user.username for user in self.participants.all()])}"

    class Meta:
        ordering = ['-messages__timestamp']
