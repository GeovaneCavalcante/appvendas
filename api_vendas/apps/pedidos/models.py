from django.db import models
from django.conf import settings


from apps.client.models import Client
from apps.produtos.models import Produtos
from apps.core.models import Status



class PedidoManager(models.Manager):
    
    def create_order(self, user, cart_items):
        order = self.create(user=user)
        for cart_item in cart_items:
            order_item = OrderItem.objects.create(
                order=order, quantity=cart_item.quantity, product=cart_item.product,
                size=cart_item.size, price=cart_item.final_price
            )
            obj, created = Products.objects.update_or_create(id=cart_item.product.id)
            obj.amount -= cart_item.quantity
            obj.save()
        return order


class Pedidos(models.Model):

    client = models.ForeignKey(Client)
    status = models.ForeignKey(Status)
    produtos =  models.ManyToManyField(Produtos, related_name="produtos")
    criado = models.DateTimeField('Criado em:', auto_now_add=True)
    modificado = models.DateTimeField('Modificado em', auto_now=True)
    observacao = models.TextField('Observação', blank=True)
    valor_total = models.FloatField('Valor total', blank=True, default=0)

    objects = PedidoManager()

    class Meta:
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'
    
    def __str__(self):
        return 'Compra #{}'.format(self.pk)

    def result_total_order(self):
        aggregate_queryset = self.items.aggregate(
            total=models.Sum(
                models.F('price') * models.F('quantity'),
                output_field=models.DecimalField()
            )
        )
        return aggregate_queryset['total']


class OrderItem(models.Model):

    pedido = models.ForeignKey(Pedidos, verbose_name='Compra', related_name='items')
    produto = models.ForeignKey(Produtos)
    size = models.CharField('Tamanho ou Medida', max_length=20)
    quantity = models.PositiveIntegerField('Quantidade', default=1)
    price = models.DecimalField('Preço', max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'Item da Compra'
        verbose_name_plural = 'Itens da Compra'

    def __str__(self):
        return '[{}] {}'.format(self.order, self.product)

    def result_total_product(self):
        return self.product.final_price * self.quantity


def post_save_shopping_item(instance, **kwargs):
    if instance.quantity < 1:
        instance.delete()

