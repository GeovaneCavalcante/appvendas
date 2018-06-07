from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import StatusSerializer
from .models import Status


class StatusAPI(ListCreateAPIView):
    
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
