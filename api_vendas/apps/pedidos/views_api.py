from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import PedidosSerializer
from .models import Pedidos


class PedidosAPI(ListCreateAPIView):
    
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer


class PedidosDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer
