from django.db.models.base import Model
from django.forms import fields
from rest_framework import serializers
from .models import employees

class SerEmp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = "__all__"

class nemp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = ['profile', 'cnic']