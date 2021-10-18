from django.http.response import HttpResponse
from cryptography.fernet import Fernet
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import SecureNote
from .forms import storepass
import random


def gen_pass(request, l,u,n,s, num):

    char = ""
    numbers = "0123456789"
    lowchar = "abcdefghijklmnopqrstuvwxyz"
    upchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    symbols = "!()-.?[]_'~:;@#$%^&*+="
    if l == 0:
        char = char + lowchar
    if u == 0:
        char = char + upchar
    if n == 0:
        char = char + numbers
    if s == 0:
        char = char + symbols

    password = ""

    for x in range(0, num):
        a = random.randint(0, len(char)-1)
        password = password + char[a]
    return HttpResponse(password)


def StorePass(request):
    letter = "p"
    if request.method == "POST":
        form = storepass(request.POST)
        if form.is_valid():
            key = Fernet.generate_key()
            hasher = Fernet(key)
            msg = form.cleaned_data["hashed"]
            msg = hasher.encrypt(msg.encode())
            account_for = form.cleaned_data["account_for"]

            return HttpResponse("All GOod")
        else:
            return HttpResponse("Not Valid")
    else:
        return render(request, 'checking.html', {'form': storepass()})




def StoreNote(request):
    letter = "n"
    if request.method == "POST":
        form = storepass(request.POST)
        if form.is_valid():
            print(form.cleaned_data["hashed"])
            print(form.cleaned_data["account_for"])

            return HttpResponse("All GOod")
        else:
            return HttpResponse("Not Valid")
    else:
        return render(request, 'checking.html', {'form': storepass()})
