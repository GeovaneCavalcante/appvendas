from django.shortcuts import redirect
from .serializer import UserSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }

def index(request):
    return redirect('/admin/login/?next=/admin/')
