# backend/core/management/commands/createadmin.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create a superuser if none exists'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username=os.environ['DJANGO_SUPERUSER_USERNAME']).exists():
            User.objects.create_superuser(
                os.environ['DJANGO_SUPERUSER_USERNAME'],
                os.environ['DJANGO_SUPERUSER_EMAIL'],
                os.environ['DJANGO_SUPERUSER_PASSWORD']
            )
            self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists'))
