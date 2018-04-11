from django.conf.urls import url

from .views_api import ProdutosDetailAPI, ProdutosAPI

urlpatterns = [
    url(r'^$', ProdutosAPI.as_view(), name='produtos'),
    url(r'^(?P<pk>[0-9]+)/$', ProdutosDetailAPI.as_view(), name='produtosDatail')
]