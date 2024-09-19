from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from friend.models import friendList, friendRequest


class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **kwargs):
        if not email:
            raise ValueError("Email is required")

        if not username:
            raise ValueError("Username is required")

        # Extract avatar from kwargs if provided
        avatar = kwargs.get('avatar', None)

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            avatar=avatar  # Set avatar
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password, **kwargs):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            avatar=kwargs.get('avatar', None)  # Set avatar for superuser
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    email = models.EmailField(null=False, blank=False, unique=True)
    username = models.CharField(max_length=50, blank=False, null=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)  # Add avatar field
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    friends = models.ManyToManyField("self", blank=True, symmetrical=True, related_name='account_friends')  # Assign a unique related_name
    is_friend = models.BooleanField(default=False)
    # is_requested = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
         return True

    def has_module_perms(self, app_label):
        return True
