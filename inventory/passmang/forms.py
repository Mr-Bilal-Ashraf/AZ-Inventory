from django import forms
from django.forms.widgets import PasswordInput
from .models import SecureContacts

class storepass(forms.Form):
    hashed = forms.CharField(widget=PasswordInput())
    account_for = forms.CharField(max_length=30)


class storenote(forms.Form):
    hashed = forms.CharField()
    account_for = forms.CharField(max_length=30)


class contactForm(forms.ModelForm):
    class Meta:
        model = SecureContacts
        exclude = ('user_id',)