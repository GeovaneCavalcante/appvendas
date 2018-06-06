from rest_framework import serializers

from .models import Pedidos
from apps.produtos.models import Produtos


class ProdutosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Produtos
        fields = '__all__'


class PedidosSerializer(serializers.ModelSerializer):
    
    produtos = ProdutosSerializer(required=False, many=True)

    class Meta:
        model = Pedidos
        fields = '__all__'

