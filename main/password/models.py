from django.db import models
from django.contrib.auth.models import User


class SecureNote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    encrypt = models.BinaryField()
    key = models.BinaryField()
    email = models.CharField(max_length=40, default="nothing@gmail.com")
    account_for = models.CharField(max_length=30)
    letter = models.CharField(max_length=1)


class SecureContacts(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    name = models.CharField(max_length=75)
    number = models.CharField(max_length=12)
    email = models.CharField(max_length=40, null= True, blank= True)
    company = models.CharField(max_length=40, null= True, blank= True)
    department = models.CharField(max_length=30, null= True, blank= True)
    designation = models.CharField(max_length=30, null= True, blank= True)
    address = models.CharField(max_length=200, null= True, blank= True)
    relationship = models.CharField(max_length=30, null= True, blank= True)
    gender = models.CharField(max_length=6, null= True, blank= True)
