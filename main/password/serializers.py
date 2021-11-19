from rest_framework import serializers
from .models import SecureNote

class PassWord(serializers.Serializer):
    email = serializers.CharField(max_length=50)
    used_for = serializers.CharField(max_length=30)
    code = serializers.CharField(max_length=50)
