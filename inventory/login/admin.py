from django.contrib import admin
from .models import UserDetails

# Register your models here.

class DisplayUser(admin.ModelAdmin):
    list_display = ('user', 'contact', 'city', 'address')

admin.site.register(UserDetails, DisplayUser)