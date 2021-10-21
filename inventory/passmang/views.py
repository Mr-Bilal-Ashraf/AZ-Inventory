from django.http.response import HttpResponse
from cryptography.fernet import Fernet
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import SecureNote
from .forms import storepass, storenote
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
    if request.method == "POST":
        form = storepass(request.POST)
        if form.is_valid():
            if request.user.is_authenticated:
                user_id = User.objects.get(username=request.user).id
                letter = "p"
                key = Fernet.generate_key()
                hasher = Fernet(key)
                msg = form.cleaned_data["hashed"]
                msg = hasher.encrypt(msg.encode())
                account_for = form.cleaned_data["account_for"]
                data = SecureNote(user_id= user_id, encrypt = msg, key = key, account_for = account_for, letter = letter)
                data.save()

                return HttpResponse("All GOod")
            else:
                return HttpResponse("Not Valid")
        else:
            return HttpResponse("Not Valid")
    else:
        if request.user.is_authenticated:
            return render(request, 'checking.html', {'form': storepass()})
        else:
            return HttpResponse("Not Logged In")


def StoreNote(request):
    if request.method == "POST":
        form = storenote(request.POST)
        if form.is_valid():
            if request.user.is_authenticated:
                user_id = User.objects.get(username=request.user).id
                letter = "n"
                key = Fernet.generate_key()
                hasher = Fernet(key)
                msg = form.cleaned_data["hashed"]
                msg = hasher.encrypt(msg.encode())
                account_for = form.cleaned_data["account_for"]
                data = SecureNote(user_id= user_id, encrypt = msg, key = key, account_for = account_for, letter = letter)
                data.save()

                return HttpResponse("All GOod")
            else:
                return HttpResponse("Not Valid")
        else:
            return HttpResponse("Not Valid")
    else:
        if request.user.is_authenticated:
            return render(request, 'checking.html', {'form': storenote()})
        else:
            return HttpResponse("Not Logged In")


def getNotes(request):
    try:
        user_id = User.objects.get(username=request.user).id
        data = SecureNote.objects.filter(user_id = user_id, letter = "n")
        for a in data:
            re_hash = Fernet(a.key)
            a.encrypt =re_hash.decrypt(a.encrypt).decode()
        return render(request, 'checking.html', {'data': data})
    except:
        return render(request, '404.html')


def getPass(request):
    try:
        user_id = User.objects.get(username=request.user).id
        data = SecureNote.objects.filter(user_id = user_id, letter = "p")
        for a in data:
            re_hash = Fernet(a.key)
            a.encrypt =re_hash.decrypt(a.encrypt).decode()
        return render(request, 'checking.html', {'data': data})
    except:
        return render(request, '404.html')


def delete(request, n):
    if request.user.is_authenticated:
        user_id = User.objects.get(username=request.user).id
        SecureNote.objects.filter(id = n,user_id = user_id).delete()
        return HttpResponse("Ho gaya")
    else:
        return HttpResponse("Invalid Query")


def storeContact(request):
    pass