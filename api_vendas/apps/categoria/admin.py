from django.contrib import admin

from .models import Categoria


class BaseCategoria(admin.ModelAdmin):
    
    list_display = ('nome',)
    list_filter = ('nome',)
    search_fields = ('nome',)
    ordering = ('nome',)


admin.site.register(Categoria, BaseCategoria)