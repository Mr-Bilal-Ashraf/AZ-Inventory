from django.urls import path
from . import views

urlpatterns = [
    path('', views.accounts, name="accounts"),
    path('sign/up/', views.Signup, name="SignUp"),
    path('sign/in/', views.Signin, name="SignIn"),
    path('<int:n>', views.b),

]