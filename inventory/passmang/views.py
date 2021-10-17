from django.http.response import HttpResponse
from django.shortcuts import render
import random


def checking(request, l,u,n,s, num):
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
        a = random.randint(0, len(char))
        password = password + char[a]
    return HttpResponse(password)