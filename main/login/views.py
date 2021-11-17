
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import messages, auth
import sys
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile



from .forms import SignUp, SignIn, userform
from .models import userDetail


def accounts(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/emp/')
    else:
        Upform = SignUp()
        Inform = SignIn()
        context = {
            'Upform' : Upform,
            'Inform' : Inform
        }
        return render(request, 'LogIn/SignUp.html', context)

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
                user = User.objects.create_user(username=name, email=mail, password=pass1, is_staff = True)
                user.save()
                auth.login(request, user)
                return HttpResponseRedirect(reverse('SignUpDetails'))

            Inform = SignIn()
            context = {
                'Upform' : form,
                'Inform' : Inform,
            }
            return render(request, 'LogIn/SignUp.html', context)            
        else:
            return HttpResponseRedirect(reverse('accounts'))
    else:
        return HttpResponseRedirect(reverse('accounts'))

def Userdetails(request):
    if request.method == 'POST':
        form = userform(data=request.POST, files=request.FILES)
        if form.is_valid():
            if request.user.is_authenticated:
                fn = form.cleaned_data["firstname"]
                ln = form.cleaned_data["lastname"]
                cnt = form.cleaned_data["contact"]
                adrs = form.cleaned_data["address"]
                User.objects.filter(username=request.user).update(first_name=fn, last_name= ln)
                id = request.user.id
                imageTemproary = Image.open(request.FILES["pic"])
                outputIoStream = BytesIO()
                imageTemproary = imageTemproary.resize((150,150))
                imageTemproary.save(outputIoStream , format='webp', quality=90)
                outputIoStream.seek(0)
                uploadedImage = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.webp" % request.FILES["pic"].name.split('.')[0], 'image/webp', sys.getsizeof(outputIoStream), None)
                userDetail.objects.update_or_create(user_id=id, defaults={'contact':cnt, 'address': adrs, 'image':uploadedImage})
                return HttpResponseRedirect('/emp/')
            else:
                return HttpResponseRedirect(reverse('accounts'))
        else:
            messages.error(request, "There is some problem.\nTry Again")
            return render(request, 'LogIn/AfterSignUp.html', {'form': form})
    else:
        if(request.user.is_authenticated):
            form = userform()
            return render(request, 'LogIn/AfterSignUp.html', {'form': form})
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
                    return HttpResponseRedirect('/emp/')
                else:
                    messages.error(request, "Password Incorrect")

            Upform = SignUp()
            context = {
                'Upform' : Upform,
                'Inform' : form,
            }
            return render(request, 'LogIn/SignUp.html', context)
        else:
            return HttpResponseRedirect(reverse('accounts'))
    else:
        return HttpResponseRedirect(reverse('accounts'))

def home(request):
    return render(request, 'Index.html')

def b(request, n):
    if User.objects.get(pk=n).delete():
        return HttpResponse("Ho gaya")
    return HttpResponse("chal nikal nai hoya")
