from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import index

urlpatterns = [
    url(r'^$', index),
    url(r'^api-token-auth/', obtain_jwt_token),
]