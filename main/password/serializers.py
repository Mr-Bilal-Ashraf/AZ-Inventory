from rest_framework import serializers
from .models import SecureContacts

class SerPass(serializers.Serializer):
    email = serializers.CharField(max_length=50)
    used_for = serializers.CharField(max_length=30)
    code = serializers.CharField(max_length=50)

class SerCon(serializers.ModelSerializer):
    class Meta:
        model = SecureContacts
        fields = "__all__"

#aaaa