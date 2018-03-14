from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import ClientSerializer
from .models import Client


class ClientAPI(ListCreateAPIView):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ClientDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
