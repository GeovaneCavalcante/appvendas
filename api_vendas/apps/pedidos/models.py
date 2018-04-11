from django.db import models

from apps.client.models import Client
from apps.produtos.models import Produtos


class Pedidos(models.Model):

    client = models.ForeignKey(Client)
    produtos =  models.ManyToManyField(Produtos)
    criado = models.DateTimeField('Criado em:', auto_now_add=True)
    modificado = models.DateTimeField('Modificado em', auto_now=True)
    observacao = models.TextField('Observação', blank=True)
    status = models.CharField('Status', max_length=30, default='Aberto')

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return self.id