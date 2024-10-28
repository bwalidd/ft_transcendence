from django.db import models
from django.conf import settings
import json

class MychatModel(models.Model):
    me = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='it_me')
    frnd = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='my_frnd')
    chats = models.JSONField()
