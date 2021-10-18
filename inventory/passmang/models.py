from django.db import models

class SecureNote(models.Model):
    user_id = models.IntegerField()
    encrypt = models.BinaryField()
    key = models.BinaryField()
    account_for = models.CharField(max_length=30)
    letter = models.CharField(max_length=1)


# class SecureContacts(models.Model):
#     name = models.CharField(max_length=75)