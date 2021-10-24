from rest_framework import serializers
from .models import employees

class addEmployee(serializers.ModelSerializer):
    class Meta:
        model = employees
        exclude = ("employee_of","salary_paid","salary_left")




class nemp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = ['profile', 'cnic']