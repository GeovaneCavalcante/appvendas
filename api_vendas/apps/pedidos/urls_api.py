from django.conf.urls import url

from .views_api import PedidosDetailAPI, PedidosAPI

urlpatterns = [
    url(r'^$', PedidosAPI.as_view(), name='pedidos'),
    url(r'^(?P<pk>[0-9]+)/$', PedidosDetailAPI.as_view(), name='pedidosDetail')
]