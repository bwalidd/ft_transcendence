from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password", "password2", "avatar")
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True},
        }

    def save(self):
        user = get_user_model()(
            email=self.validated_data["email"],
            username=self.validated_data["username"],
            avatar=self.validated_data.get("avatar")
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords do not match!"})

        user.set_password(password)
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


class AccountSerializer(serializers.ModelSerializer):
    is_friend = serializers.BooleanField(read_only=True)
    is_requested = serializers.BooleanField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "avatar", "friends", "is_friend", "is_requested")