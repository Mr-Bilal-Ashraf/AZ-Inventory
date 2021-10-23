from django.db.models.base import Model
from rest_framework import serializers
from .models import SecureNote

class firstse(serializers.ModelSerializer):
    class Meta:
        model = SecureNote
        exclude = ['encrypt','key','id']
