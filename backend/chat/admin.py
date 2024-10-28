from django.contrib import admin
from .models import MychatModel

@admin.register(MychatModel)
class MychatModelAdmin(admin.ModelAdmin):
    list_display = ('id','me','frnd','chats')