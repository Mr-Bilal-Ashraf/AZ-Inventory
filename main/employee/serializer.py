from rest_framework import serializers
from .models import employees

class SerEmp(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields = "__all__"


#abcdef
