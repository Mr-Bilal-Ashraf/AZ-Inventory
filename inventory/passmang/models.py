from django.db import models

class SecureNote(models.Model):
    user_id = models.IntegerField()
    encrypt = models.BinaryField()
    key = models.BinaryField()
    account_for = models.CharField(max_length=30)
    letter = models.CharField(max_length=1)


class SecureContacts(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=75)
    number = models.CharField(max_length=12)
    email = models.CharField(max_length=40, null= True, blank= True)
    company = models.CharField(max_length=40, null= True, blank= True)
    designation = models.CharField(max_length=30, null= True, blank= True)
    address = models.CharField(max_length=200, null= True, blank= True)
    website = models.CharField(max_length=80, null= True, blank= True)
    relationship = models.CharField(max_length=30, null= True, blank= True)
    note = models.CharField(max_length=100, null= True, blank= True)