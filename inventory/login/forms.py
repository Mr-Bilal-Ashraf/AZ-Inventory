from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms.models import ModelForm
from django.forms.widgets import EmailInput, PasswordInput, TextInput

from .models import UserDetails
from django.contrib.auth.models import User


class userform(forms.ModelForm):
    class Meta:
        model = UserDetails
        fields = ('user','contact', 'city')


class SignUp(forms.Form):
    username = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter A Unique UserName', 'id': "sign_up_username"}))
    email = forms.CharField(widget= EmailInput(attrs={'class': 'form-style', 'placeholder': 'Enter Your Email', 'id': "sign_up_email"}))
    password1 = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Type Password', 'id': "sign_up_pass1"}))
    password2 = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Re-Type Password', 'id': "sign_up_pass2"}))
        


class SignIn(forms.Form):
    username = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter Your UserName', 'id': "sign_in_username"}))
    password = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Type Password', 'id': "sign_in_pass1"}))
    