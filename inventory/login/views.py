
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import messages, auth
from django.contrib.auth.decorators import login_required

from .forms import SignUp, SignIn
from .models import UserDetails



def accounts(request):
    Upform = SignUp()
    Inform = SignIn()
    context = {
        'Upform' : Upform,
        'Inform' : Inform
    }
    return render(request, 'index.html', context)

def Signup(request):
    if request.method == 'POST':
        form = SignUp(request.POST)
        if form.is_valid():
            
            check = 0
            pass1 = form.cleaned_data["password1"]
            pass2 = form.cleaned_data["password2"]
            name = form.cleaned_data["username"].lower()
            mail = form.cleaned_data["email"]

            if User.objects.filter(email=mail).exists():
                check = 1
                messages.error(request, "Email Already Registered!")

            if User.objects.filter(username=name).exists():
                check = 1
                messages.error(request, "UserName Already taken")
            
            if pass1 != pass2 and check != 1:
                check = 1
                messages.error(request, "Passwords Not Matched")

            if len(str(pass1)) < 8 and check != 1:
                check = 1
                messages.error(request, "Passwords Should Be 8 letters Minimum")
            
            if check != 1:
                User.objects.create_user(username=name, email=mail, password=pass1)
                messages.success(request, "Login To Proceed")

            Inform = SignIn()
            context = {
                'Upform' : form,
                'Inform' : Inform,
            }
            return render(request, 'index.html', context)            
        else:
            return HttpResponseRedirect(reverse('accounts'))
    else:
        return HttpResponseRedirect(reverse('accounts'))

def Signin(request):
    if request.method == 'POST':
        form = SignIn(request.POST)
        if form.is_valid():

            check = 0
            name = form.cleaned_data["username"].lower()
            passw = form.cleaned_data["password"]

            if not User.objects.filter(username=name).exists():
                check = 1
                messages.error(request, "User Name Not Exist")

            if check != 1:
                user = auth.authenticate(request, username= name, password= passw)
                if user is not None:
                    auth.login(request, user)
                    return HttpResponse("Logged In")
                else:
                    messages.error(request, "Password Incorrect")

            Upform = SignUp()
            context = {
                'Upform' : Upform,
                'Inform' : form,
            }
            return render(request, 'index.html', context)
        else:
            return HttpResponseRedirect(reverse('accounts'))
    else:
        return HttpResponseRedirect(reverse('accounts'))

def b(request, n):
    if User.objects.get(pk=n).delete():
        return HttpResponse("Ho gaya")
    return HttpResponse("Kuch v nai hoya")