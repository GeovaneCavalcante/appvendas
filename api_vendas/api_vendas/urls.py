from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='App Vendas API')


urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('apps.accounts.urls')),

    #API
    url(r'^api_client/', include('apps.client.urls_api')),
    url(r'^api_categoria/', include('apps.categoria.urls_api')),
    url(r'^api_produtos/', include('apps.produtos.urls_api')),
    url(r'^api_order/', include('apps.order.urls_api')),
    url(r'^api_core/', include('apps.core.urls_api')),

    #DOCS
    url(r'^docs/', schema_view)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Aplicação Vendas"
