from django.urls import path
from . import views

urlpatterns = [
    path('', views.accounts, name="startpage"),
    path('acc/', views.accounts, name="accounts"),
    path('sign/up/', views.Signup, name="SignUp"),
    path('sign/in/', views.Signin, name="SignIn"),
    path('sign/details/', views.Userdetails, name="SignUpDetails"),
    path('home/', views.home, name="homepage"),
    path('<int:n>', views.b),

]


# abcd