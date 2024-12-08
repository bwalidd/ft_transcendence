from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from friend.models import friendList, friendRequest

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = get_user_model()
        fields = ("login", "email", "password", "password2", "avatar")
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True},
        }

    def save(self):
        user = get_user_model()(
            email=self.validated_data["email"],
            login=self.validated_data["login"],
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


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "login", "avatar")  # Simplified fields for friends


class AccountSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    is_friend = serializers.SerializerMethodField()
    is_requested = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ("id", "login", "email", "avatar", "friends", "is_friend", "is_requested")

    def get_friends(self, obj):
        try:
            # Retrieve the user's friend list
            friend_list = obj.user_friend_list
            # Serialize the friends using the FriendSerializer (simplified)
            friends = friend_list.friends.all()
            return FriendSerializer(friends, many=True, context=self.context).data
        except friendList.DoesNotExist:
            return []

    def get_is_friend(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return request.user.friends.filter(id=obj.id).exists()
        return False

    def get_is_requested(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return friendRequest.objects.filter(sender=request.user, receiver=obj).exists()
        return False

class AccountDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "login", "email", "avatar","password")


# from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
# from .models import Account

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = get_user_model()
        fields = ('login', 'email', 'password', 'confirm_password', 'avatar')

    def validate(self, data):
        # Validate that passwords match if provided
        if data.get('password') or data.get('confirm_password'):
            if data.get('password') != data.get('confirm_password'):
                raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def update(self, instance, validated_data):
        # Update login and email
        instance.login = validated_data.get('login', instance.login)
        instance.email = validated_data.get('email', instance.email)
        
        # Update avatar if provided
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']
        
        # Update password if both password fields are filled
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance
