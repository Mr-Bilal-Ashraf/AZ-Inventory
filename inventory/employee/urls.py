from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee.as_view(), name="Emp_Home"),
    path('<int:pk>/', views.employee.as_view(), name="emp_update"),

    # path('pay/', views.salary, name="pay"),
]