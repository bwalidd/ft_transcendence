from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import SignUpSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate



@api_view(['POST'])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)
    if user.is_valid():
        if not User.objects.filter(username=data['username']).exists():
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']),
            )
            user.save()
            return Response({'message':'you are registered successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'username already exits'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(user.errors)

@api_view(['POST'])
def login(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        # If you want to include more information like tokens, you can include that here
        return Response({'message': 'You are logged in successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = SignUpSerializer(request.user)
    return Response(user.data)