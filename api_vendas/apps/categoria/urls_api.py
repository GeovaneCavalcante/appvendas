from django.conf.urls import url

from .views_api import CategoriaDetailAPI, CategoriaAPI

urlpatterns = [
    url(r'^$', CategoriaAPI.as_view(), name='categoria'),
    url(r'^(?P<pk>[0-9]+)/$', CategoriaDetailAPI.as_view(), name='categoriaDatail')
]