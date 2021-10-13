from django.db import models

class employees(models.Model):
    profile = models.ImageField(upload_to="emp/", blank=True, null=True)
    reg_date = models.CharField(max_length=11, blank=True, null=True)
    designation = models.CharField(max_length=30, blank=True, null=True)
    salary_type = models.CharField(max_length=7, blank=True, null=True)
    salary = models.IntegerField(blank=True, null=True)
    salary_paid = models.IntegerField(blank=True, null=True)
    salary_left = models.IntegerField(blank=True, null=True)
    commission = models.IntegerField(blank=True, null=True)
    cnic = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=12, blank=True, null=True)
    address = models.CharField(max_length=150, blank=True, null=True)
    Bank_Name = models.CharField(max_length=50, blank=True, null=True)
    account_num = models.CharField(max_length=30, blank=True, null=True)
    employee_of = models.IntegerField(blank=True, null=True)
