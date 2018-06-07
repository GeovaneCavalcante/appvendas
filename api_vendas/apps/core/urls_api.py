from django.conf.urls import url

from .views_api import StatusAPI

urlpatterns = [
    url(r'^status$', StatusAPI.as_view(), name='status'),
]