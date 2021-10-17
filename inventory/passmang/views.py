from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
def checking(request):
    return HttpResponse("hy")