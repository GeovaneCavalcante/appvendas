from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class MyUserManager(BaseUserManager):

    def BaseCreate(self, email, password, is_staff, is_superuser, **extra_field):
        if not email:
            raise ValueError('O usuário deve ter endereço de e-mail')

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=timezone.now(),
            date_joined=timezone.now(),
            **extra_field
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_field):
        return self.BaseCreate(email, password, False, False, **extra_field)

    def create_superuser(self, email, password, **extra_fields):
        return self.BaseCreate(email, password, True, True, **extra_fields)
