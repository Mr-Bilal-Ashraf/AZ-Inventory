from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model


class employees(models.Model):

    account_num = models.CharField(max_length=30, blank=True, null=True)
    address = models.CharField(max_length=150, blank=True, null=True)
    blood = models.CharField(max_length=4, blank=True, null=True)
    cnic = models.CharField(max_length=15, blank=True, null=True)
    commission = models.FloatField(blank=True, null=True)
    department = models.CharField(max_length=60, blank=True, null=True)
    designation = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(max_length=30 ,blank=True, null=True)
    employee_of = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    father_name = models.CharField(max_length=70, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    mobile = models.CharField(max_length=12, blank=True, null=True)
    name = models.CharField(max_length=70, blank=True, null=True)
    other_mobile = models.CharField(max_length=12, blank=True, null=True)
    profile = models.ImageField(upload_to="emp/", blank=True, null=True)
    religion = models.CharField(max_length=15, blank=True, null=True)
    reg_date = models.CharField(max_length=11, blank=True, null=True)
    salary_type = models.CharField(max_length=7, blank=True, null=True)
    salary = models.IntegerField(blank=True, null=True)
    salary_paid = models.IntegerField(blank=True, null=True)
    salary_left = models.IntegerField(blank=True, null=True)
    daily_leaves = models.CharField(max_length= 500 ,blank=True, null=True)
    monthly_leaves = models.CharField(max_length= 2000 ,blank=True, null=True)

class complains(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    name = models.CharField(max_length=70, blank=True, null=True)
    complain = models.CharField(max_length=500, blank=True, null=True)
    page = models.CharField(max_length=200)
    
    