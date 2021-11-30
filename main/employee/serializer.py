from rest_framework import serializers
from .models import employees, complains

class SerEmp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = "__all__"

class SerComplain(serializers.ModelSerializer):
    class Meta:
        model = complains
        fields = "__all__"