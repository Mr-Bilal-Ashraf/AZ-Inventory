import time
from django.http.response import HttpResponse
from cryptography.fernet import Fernet
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import SecureNote
from .forms import storepass, storenote

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import PassWord

#   password manager starts from here

class PASSWORD(APIView):
    parser_classes = (FormParser, JSONParser)
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        data = SecureNote.objects.values("email","account_for").filter(user_id=request.user.id, letter="p")
        return render(request, 'password/password.html', {'pass': data})

    def post(self, request, format=None):
        a = PassWord(data=request.data)
        if a.is_valid():
            key = Fernet.generate_key()
            hasher = Fernet(key)
            msg = request.data["code"]
            msg = hasher.encrypt(msg.encode())
            instance = User.objects.get(id=request.user.id)
            data = SecureNote(
                user_id=instance, email=request.data["email"], encrypt=msg, key=key, account_for=request.data["used_for"], letter="p")
            data.save()
            obj = SecureNote.objects.values("id").filter(
                user_id=instance, email=request.data["email"])
            return Response({"x": True, "id": obj[len(obj)-1]["id"]})
        else:
            print(a.errors)
            return Response({"x": False})

    def patch(self, request, pk, format=None):
        if request.user.check_password(request.data["code"]):
            key = Fernet.generate_key()
            hasher = Fernet(key)
            msg = request.data["check"]
            msg = hasher.encrypt(msg.encode())
            SecureNote.objects.filter(user_id=request.user.id,letter="p",id=pk).update(key=key,encrypt=msg)
            return Response({"x": True})
        else:
            return Response({"x": False})

    def delete(self, request, pk, format=None):
        try:
            SecureNote.objects.filter(id=pk).delete()
            return Response({"x": True})
        except:
            return Response({"x": False})


@api_view(['POST'])
def return_password(request):
    if request.user.check_password(request.data["code"]):
        data = SecureNote.objects.values("id", "encrypt", "key").filter(
            user_id=request.user.id, letter="p")
        for a in data:
            re_hash = Fernet(a["key"])
            a["encrypt"] = re_hash.decrypt(a["encrypt"]).decode()
        return Response({"x": True, "data": data})
    else:
        return Response({"x": False})

#   password manager ends here

class abcd(APIView):
    def get(self, request):
        a = SecureNote.objects.all()
        serialized_data = firstse(a, many=True)
        return Response(serialized_data.data)

    def post(self, request, format=None):
        da = firstse(data=request.data)
        if da.is_valid():
            da.save()
            return Response({'a': "data valid"})
        return Response(da.data)


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
                data = SecureNote(user_id=user_id, encrypt=msg,
                                  key=key, account_for=account_for, letter=letter)
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
        data = SecureNote.objects.filter(user_id=user_id, letter="n")
        for a in data:
            re_hash = Fernet(a.key)
            a.encrypt = re_hash.decrypt(a.encrypt).decode()
        return render(request, 'checking.html', {'data': data})
    except:
        return render(request, '404.html')


def getPass(request):
    try:
        user_id = User.objects.get(username=request.user).id
        data = SecureNote.objects.filter(user_id=user_id, letter="p")
        for a in data:
            re_hash = Fernet(a.key)
            a.encrypt = re_hash.decrypt(a.encrypt).decode()
        return render(request, 'checking.html', {'data': data})
    except:
        return render(request, '404.html')


def delete(request, n):
    if request.user.is_authenticated:
        user_id = User.objects.get(username=request.user).id
        SecureNote.objects.filter(id=n, user_id=user_id).delete()
        return HttpResponse("Ho gaya")
    else:
        return HttpResponse("Invalid Query")


def storeContact(request):
    pass
