from django.conf.urls import url
from .views_api import (
    ListOrdersByUser, 
    ListAllOrders,
    OrderViewSet
)

urlpatterns = [
    url(r'order/', OrderViewSet.as_view()),
    url(r'byuser/', ListOrdersByUser.as_view()),
    url(r'list_orders/', ListAllOrders.as_view()),
]
