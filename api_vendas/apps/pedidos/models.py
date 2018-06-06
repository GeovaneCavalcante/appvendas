from django.db import models

from apps.client.models import Client
from apps.produtos.models import Produtos
from apps.core.models import Status


class Pedidos(models.Model):

    client = models.ForeignKey(Client)
    status = models.ForeignKey(Status)
    produtos =  models.ManyToManyField(Produtos, related_name="produtos")
    criado = models.DateTimeField('Criado em:', auto_now_add=True)
    modificado = models.DateTimeField('Modificado em', auto_now=True)
    observacao = models.TextField('Observação', blank=True)

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

    def __str__(self):
        return "Pedido"