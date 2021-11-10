from django.db import models
from django.contrib.auth.models import User


class userDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="users/", null= True, blank= True)
    contact = models.CharField(max_length=11)
    address = models.CharField(max_length=150)


