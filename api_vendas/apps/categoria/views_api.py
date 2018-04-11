from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializers import CategoriaSerializer
from .models import Categoria


class CategoriaAPI(ListCreateAPIView):
    
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class CategoriaDetailAPI(RetrieveUpdateDestroyAPIView):
    
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
