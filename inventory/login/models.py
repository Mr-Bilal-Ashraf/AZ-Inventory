from django.db import models
from django.contrib.auth.models import User

class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="img/%y")
    contact = models.CharField(max_length=11)
    city = models.CharField(max_length=40)
    address = models.CharField(max_length=150)

class userDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="img/%y", null= True, blank= True)
    contact = models.CharField(max_length=11)
    address = models.CharField(max_length=150)
    employee = models.IntegerField(null= True)


