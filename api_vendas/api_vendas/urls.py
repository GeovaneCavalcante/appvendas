from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('apps.accounts.urls')),
    url(r'^api_client/', include('apps.client.urls_api')),
    url(r'^api_categoria/', include('apps.categoria.urls_api')),
    url(r'^api_produtos/', include('apps.produtos.urls_api')),
    url(r'^api_pedidos/', include('apps.pedidos.urls_api')),
    url(r'^api_core/', include('apps.core.urls_api'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Aplicação Vendas"
