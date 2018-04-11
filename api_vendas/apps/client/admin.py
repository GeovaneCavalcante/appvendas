from django.contrib import admin

from .models import Client


class BaseClient(admin.ModelAdmin):
    
    list_display = ('email', 'name', 'telefone', 'criado')
    list_filter = ('email', 'name')
    search_fields = ('email', 'name')
    ordering = ('email', 'name')

admin.site.register(Client, BaseClient)
