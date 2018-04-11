from django.conf.urls import url

from .views_api import ClientDetailAPI, ClientAPI

urlpatterns = [
    url(r'^$', ClientAPI.as_view(), name='client'),
    url(r'^(?P<pk>[0-9]+)/$', ClientDetailAPI.as_view(), name='clientDetail')
]