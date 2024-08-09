# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from django.contrib.auth.models import User
# from rest_framework.authentication import get_authorization_header
# from django.contrib.auth.hashers import make_password
# from rest_framework import status
# from .auth import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
# from .serializers import SignUpSerializer, UserSerializer
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth import authenticate
# from .models import Profile
# import jwt, datetime

# @api_view(['POST'])
# def register(request):
#     data = request.data
#     user_serializer = SignUpSerializer(data=data)
#     if user_serializer.is_valid():
#         user = user_serializer.save()
#         profile_pic = request.FILES.get('avatar', None)  # Fetch the uploaded avatar file
#         Profile.objects.create(user=user, profile_pic=profile_pic)
#         return Response({'message': 'You are registered successfully'}, status=status.HTTP_201_CREATED)
#     return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def login(request):
#     # data = request.data
#     # username = data.get('username')
#     # password = data.get('password')

#     # if not username or not password:
#     #     return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

#     # user = authenticate(request, username=username, password=password)
#     user = User.objects.filter(username=request.data['username']).first()

#     if not user:
#         return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

#     if not user.check_password(request.data['password']):
#         return Response({'message': 'Invalid credentials password'}, status=status.HTTP_400_BAD_REQUEST)

#     access_token = create_access_token(user.id)
#     refresh_token = create_refresh_token(user.id)
#     response = Response()
#     response.set_cookie(key='refresh_tooken', value=refresh_token, httponly=True)

#     response.data = {
#         'token': access_token
#     }
#     return response
#     # else:
#     #     return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def current_user(request):
# #     serializer = UserSerializer(request.user)
# #     return Response(serializer.data)


# @api_view(['GET'])
# def myprofile(request):
#     auth = get_authorization_header(request).split()

#     print('decoded_token success')
#     if auth and len(auth) == 2:
#         token = auth[1].decode('utf-8')
#         decoded_token = decode_access_token(token)
#         print('decoded_token success')
#         user = User.objects.get(id=decoded_token).first()
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
#     else:
#         return Response({'message': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)








#-------------------------------worked----------------------------------

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import SignUpSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import Profile
import jwt, datetime

@api_view(['POST'])
def register(request):
    data = request.data
    user_serializer = SignUpSerializer(data=data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        profile_pic = request.FILES.get('avatar', None)  # Fetch the uploaded avatar file
        Profile.objects.create(user=user, profile_pic=profile_pic)
        return Response({'message': 'You are registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload,'secret', algorithm='HS256')

        res = Response()

        res.set_cookie(key='jwtt', value=token, httponly=True)
        res.data = {
            'jwt': token
        }
        return res

    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def current_user(request):
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)


@api_view(['GET'])
def myprofile(request):
    token = request.COOKIES.get('jwtt')
    if not token:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Session expired'}, status=status.HTTP_401_UNAUTHORIZED)
    user = User.objects.filter(id=payload['id']).first()
    
    serializer = UserSerializer(user)
    return Response(serializer.data)
