from django.db.models.base import Model
from django.forms import fields
from rest_framework import serializers
from .models import employees

class addEmployee(serializers.ModelSerializer):
    class Meta:
        model = employees
        exclude = ("employee_of","salary_paid","salary_left")


class updateEmployee(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = ["name", "father_name", "email", "blood", "religion", "gender", "address", "department", "designation", "commission", "mobile",
                 "other_mobile", "account_num"]

class a(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = "__all__"

class nemp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = ['profile', 'cnic']