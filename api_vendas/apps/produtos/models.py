from django.db import models

from apps.categoria.models import Categoria


class Produtos(models.Model):
    
    nome = models.CharField('Nome', max_length=30)
    descricao = models.CharField('Descrição', max_length=30, blank=True)
    valor = models.FloatField('Valor')
    quantidade = models.IntegerField('Quantidade')
    categoria = models.ForeignKey(Categoria)
    foto = models.ImageField('Foto', upload_to='upload', blank=True)
    
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'


    def __str__(self):
        return self.nome    

