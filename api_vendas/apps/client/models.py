from django.db import models


class Client(models.Model):
    
    name = models.CharField('Nome', max_length=50)
    cidade = models.CharField('Cidade', max_length=20, blank=True)
    estado = models.CharField('Estado', max_length=20, blank=True)
    endereco = models.CharField('Endereço', max_length=50, blank=True)

    telefone = models.IntegerField('Telefone')
    email = models.EmailField('Email', blank=True)

    cpf = models.BigIntegerField('CPF', unique=True)
    cnpj = models.BigIntegerField('CNPJ', unique=True, blank=True)

    criado = models.DateTimeField('Criado em:', auto_now_add=True)
    modificado = models.DateTimeField('Modificado em', auto_now=True)


    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'

    def __str__(self):
        return self.name    

