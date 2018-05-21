from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from .serializers import ProdutosSerializer
from .models import Produtos


class ProdutosAPI(ListCreateAPIView):
    
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer


class ProdutosAPI(ListCreateAPIView):
    
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer
    


class ProdutosDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer


class ProdutosCategoria(ListAPIView):
    
    serializer_class = ProdutosSerializer

    def get_queryset(self):
        return Produtos.objects.filter(categoria=self.kwargs['id'])
