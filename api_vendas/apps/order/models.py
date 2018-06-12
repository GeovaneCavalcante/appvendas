from django.db import models
from apps.accounts.models import User
from apps.produtos.models import Produtos
from apps.client.models import Client


class Order(models.Model):
    STATUS_CHOICES = (
        (0, 'Em andamento'),
        (1, 'Concluída'),
        (2, 'Cancelada')
    )

    user = models.ForeignKey(User, verbose_name='Usuário', editable=False)
    client = models.ForeignKey(Client, null=True)
    status = models.IntegerField('Status', choices=STATUS_CHOICES, default=0, blank=True)
    created_at = models.DateTimeField('Data da Criação', auto_now_add=True)
    update_at = models.DateTimeField('Data da Modificação', auto_now=True)
    obs = models.TextField('Observação', blank=True)


    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'
    
    def __str__(self):
        return 'Pedido #{}'.format(self.pk)

    def result_total_order(self):
        aggregate_queryset = self.items.aggregate(
            total=models.Sum(
                models.F('price') * models.F('quantity'),
                output_field=models.DecimalField()
            )
        )
        return aggregate_queryset['total']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, verbose_name='Pedido', related_name='items')
    product = models.ForeignKey(Produtos)
    quantity = models.PositiveIntegerField('Quantidade', default=1)
    price = models.DecimalField('Preço', max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'Item da Compra'
        verbose_name_plural = 'Itens da Compra'

    def __str__(self):
        return '[{}] {}'.format(self.order, self.product)

    def result_total_product(self):
        return self.price * self.quantity
