import os
from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a superuser if it does not exist'

    def handle(self, *args, **kwargs):
        User = get_user_model()  # Use the custom user model
        superuser_username = os.getenv('DJANGO_SUPERUSER_USERNAME')
        superuser_email = os.getenv('DJANGO_SUPERUSER_EMAIL')
        superuser_password = os.getenv('DJANGO_SUPERUSER_PASSWORD')

        if not User.objects.filter(username=superuser_username).exists():
            User.objects.create_superuser(
                username=superuser_username,
                email=superuser_email,
                password=superuser_password
            )
            self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('Superuser already exists'))
