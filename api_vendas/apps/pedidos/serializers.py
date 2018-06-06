from rest_framework import serializers

from .models import Pedidos
from apps.produtos.models import Produtos
from apps.client.models import Client
from apps.core.models import Status



class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'


class ProdutosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Produtos
        fields = '__all__'


class PedidosSerializer(serializers.ModelSerializer):
    
    produtos = ProdutosSerializer(required=False, many=True)
    status = StatusSerializer(required=False)
    client = ClientSerializer(required=False)

    class Meta:
        model = Pedidos
        fields = '__all__'

