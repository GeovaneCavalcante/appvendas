from django.conf.urls import url

from .views_api import ProdutosDetailAPI, ProdutosAPI, ProdutosCategoria

urlpatterns = [
    url(r'^$', ProdutosAPI.as_view(), name='produtos'),
    url(r'^(?P<pk>[0-9]+)/$', ProdutosDetailAPI.as_view(), name='produtosDatail'),
    url(r'^categoria/(?P<id>[0-9]+)/$', ProdutosCategoria.as_view(), name='produtosCategoria')
]