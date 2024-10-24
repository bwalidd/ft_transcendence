from django.contrib.auth import authenticate
from django.conf import settings
from django.middleware import csrf
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from account import serializers, models
from django.shortcuts import get_object_or_404


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }

def set_csrf_token(response, request):
    response["X-CSRFToken"] = csrf.get_token(request)


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    user = authenticate(email=email, password=password)

    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens["refresh_token"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        # Add user data to the response, including avatar
        user_data = {
            "username": user.username,
            "email": user.email,
            "avatar": request.build_absolute_uri(user.avatar.url) if user.avatar else None,
            "csrf_token": csrf.get_token(request),  # Include CSRF token here
        }
        res.data = {**tokens, **user_data}

        print("------->" + res.data["csrf_token"] + "------->")  # Log the CSRF token for debugging
        return res
    raise rest_exceptions.AuthenticationFailed(
        "Email or Password is incorrect!"
    )


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response("Registered!")
    return rest_exceptions.AuthenticationFailed("Invalid credentials!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        
        # Set CSRF token in the response
        set_csrf_token(res, request)

        return res
    except:
        raise rest_exceptions.ParseError("Invalid token")


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = models.Account.objects.get(id=request.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status=404)

    serializer = serializers.AccountSerializer(user)
    res = response.Response(serializer.data)

    # Set CSRF token in the response
    set_csrf_token(res, request)

    return res




@rest_decorators.api_view(["GET"])
# @rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def allusers(request):
    users = models.Account.objects.all()  # Fetch all users
    serializer = serializers.AccountSerializer(users, many=True)  # Serialize multiple users
    return response.Response(serializer.data)  # Return serialized data



@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def search_users(request):
    search_string = request.GET.get("search", "").strip()

    if not search_string:
        return response.Response({"error": "Search string is required"}, status=400)

    users = models.Account.objects.filter(username__icontains=search_string)
    serializer = serializers.AccountSerializer(users, many=True)
    return response.Response(serializer.data)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def userProfileView(request, user_id):
    # Fetch the user by ID
    user = get_object_or_404(models.Account, id=user_id)
    
    # Serialize the user data
    serializer = serializers.AccountSerializer(user)
    
    # Check if the user is a friend of the requesting user
    is_friend = request.user.friends.filter(id=user_id).exists()

    # Check if a friend request has been sent
    is_requested = models.friendRequest.objects.filter(sender=request.user, receiver=user).exists()
    # Add the is_friend and is_requested status to the serialized data
    response_data = serializer.data
    response_data['is_friend'] = is_friend
    response_data['is_requested'] = is_requested

    return response.Response(response_data)
