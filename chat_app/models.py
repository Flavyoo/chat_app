# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class ChatUserManager(BaseUserManager):
    def create_user(self, username, display_name, password=None):
        """
        Creates and saves a user with the given username, display_name,
        and password.
        """
        if not username:
            raise ValueError('Users must provide a username')
        user = self.model(display_name=display_name, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, display_name, password):
        """
        Creates and saves a superuser with the given username, display_name,
        and password.
        """
        user = self.create_user(username, display_name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class ChatUser(AbstractBaseUser):
    display_name = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=50, blank=False, null=False, unique=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['display_name']

    objects = ChatUserManager()

    def __str__(self):
        return self.display_name

    def has_perm(self, perm, obj=None):
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # Simplest possible answer: Yes, always
        return True

    def get_short_name(self):
        return self.display_name

    @property
    def is_staff(self):
        return self.is_admin
