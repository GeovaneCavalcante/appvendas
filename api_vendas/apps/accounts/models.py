from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


from .manage import MyUserManager


class User(AbstractBaseUser, PermissionsMixin):

    name = models.CharField('Nome', max_length=100, unique=False)
    email = models.EmailField('E-mail', unique=True)
    phone = models.CharField('Telefone', max_length=100, unique=True, blank=True, null=True)
    photo = models.ImageField('Foto', blank=True, upload_to='photo', null=True)
    is_staff = models.BooleanField('Equipe', default=False)
    is_active = models.BooleanField('Ativo', default=True)
    date_joined = models.DateTimeField('Data de Entrada', auto_now_add=True)
    date_update = models.DateTimeField('Data e hora da ultima atualização', blank=True, null=True)

    USERNAME_FIELD = 'email'

    objects = MyUserManager()

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    def __str__(self):
        return self.name

    def get_full_name(self):
        return str(self)

    def get_short_name(self):
        return str(self)
