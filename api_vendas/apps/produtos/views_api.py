from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import ProdutosSerializer
from .models import Produtos


class ProdutosAPI(ListCreateAPIView):
    
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer


class ProdutosDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer
