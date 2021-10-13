from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import addEmployee


def form(request):
    if request.method == 'POST':
        form = addEmployee(request.POST, request.FILES)
        if form.is_valid():
            print(form.cleaned_data['reg_date'])
        return HttpResponseRedirect('/emp/check/')
    else:
        return render(request, 'checking.html', {'form': addEmployee()})
