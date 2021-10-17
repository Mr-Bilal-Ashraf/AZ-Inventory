from django.urls import path
from . import views

urlpatterns = [
    path('make/<int:l>/<int:u>/<int:n>/<int:s>/<int:num>', views.checking, name="Add_Emp"),
]