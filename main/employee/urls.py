from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee.as_view(), name="Emp_Home"),
    path('<int:pk>/', views.employee.as_view(), name="emp_update"),

    path('srch/', views.srch, name="search"),
    path('get/extra/', views.get_extra, name="get_extra"),
    path('logout/', views.logOut, name="LogOut"),
    path('leave/', views.mark_leave, name="leaves"),
]
