from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import PedidosSerializer
from .models import Pedidos
from apps.produtos.models import Produtos
from pprint import pprint


class PedidosAPI(ListCreateAPIView):
    
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer

   


class PedidosDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Pedidos.objects.all()
    serializer_class = PedidosSerializer
