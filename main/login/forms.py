from django import forms
from django.forms.widgets import EmailInput, FileInput, PasswordInput, TextInput, Textarea


class userform(forms.Form):
    pic = forms.ImageField(widget=FileInput(attrs={'id':'taking_image', 'onchange':"change_profile(event,this,'profile_pic')", 'style': "display: none;"}), required=False)
    firstname = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter First Name'}))
    lastname = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter Last Name'}))
    contact = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter Contact Number'}))
    address = forms.CharField(widget= Textarea(attrs={'class': 'form-style', 'placeholder': 'Enter Your Address'}))


class SignUp(forms.Form):
    username = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter A Unique UserName', 'id': "sign_up_username"}))
    email = forms.CharField(widget= EmailInput(attrs={'class': 'form-style', 'placeholder': 'Enter Your Email', 'id': "sign_up_email"}))
    password1 = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Type Password', 'id': "sign_up_pass1"}))
    password2 = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Re-Type Password', 'id': "sign_up_pass2"}))
        


class SignIn(forms.Form):
    username = forms.CharField(widget= TextInput(attrs={'class': 'form-style', 'placeholder': 'Enter Your UserName', 'id': "sign_in_username"}))
    password = forms.CharField(widget = PasswordInput(attrs={'class': 'form-style', 'placeholder': 'Type Password', 'id': "sign_in_pass1"}))


#abcdef
