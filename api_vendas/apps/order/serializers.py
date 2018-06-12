from rest_framework import serializers
from .models import Order, OrderItem

from apps.produtos.models import Produtos



class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(source='product')
    img = serializers.StringRelatedField(source='product.foto')
    total_products = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'quantity', 'price', 'product', 'img', 'product_name', 'total_products']

    def get_total_products(self, obj):
        return obj.price * obj.quantity    


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(required=False, many=True)
            
    class Meta:
        model = Order
        fields = ['id', 'status', 'client', 'created_at', 'update_at', 'user', 'obs', 'items',]


    def create(self, validated_data):
        items_data = {}
        if validated_data.get("items"):
            items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        order.save()

        return order
