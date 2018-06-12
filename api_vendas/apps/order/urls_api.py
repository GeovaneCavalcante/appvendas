from django.conf.urls import url
from .views_api import (
    DeleteUpdateOrder,
    ListOrdersByUser, 
    ListAllOrders,
    OrderViewSet,
)

urlpatterns = [
    url(r'order/(?P<pk>[0-9]+)/', DeleteUpdateOrder.as_view()),
    url(r'order/', OrderViewSet.as_view()),
    url(r'byuser/', ListOrdersByUser.as_view()),
    url(r'list_orders/', ListAllOrders.as_view()),
]
