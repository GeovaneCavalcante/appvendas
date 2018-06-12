from django.contrib import admin

from .models import Order, OrderItem


class OrderItemAdmin(admin.StackedInline):
    model = OrderItem
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = ('return_order', 'user', 'client', 'status', 'created_at', 'update_at')
    inlines = [OrderItemAdmin,]
    list_display_links = ('return_order', 'user', 'client', 'status', 'created_at', 'update_at')

    def return_order(self, obj):
        return 'Pedido #{}'.format(obj.pk)

    return_order.allow_tags = True
    return_order.short_description = 'Pedido'


admin.site.register(Order, OrderAdmin)