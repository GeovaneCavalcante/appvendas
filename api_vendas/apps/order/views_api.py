from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


from .models import Order, OrderItem

from apps.produtos.models import Produtos

from .serializers import OrderSerializer, OrderItemSerializer


class OrderViewSet(generics.CreateAPIView):
    """
    Create new Order
    """
    serializer_class = OrderSerializer
    permission_classes = [AllowAny, ]


class ListOrdersByUser(generics.ListAPIView):
    """
    Lists all orders by the user
    """
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class ListAllOrders(generics.ListAPIView):
    """
    Lists all orders
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class DeleteUpdateOrder(generics.RetrieveDestroyAPIView):
    """
    Delete and Update Order
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

