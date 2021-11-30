from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee.as_view(), name="Emp_Home"),
    path('<int:pk>/', views.employee.as_view(), name="emp_update"),

    path('srch/', views.srch, name="search"),
    path('get/extra/', views.get_extra, name="get_extra"),
    path('logout/', views.logOut, name="LogOut"),
    path('leave/', views.mark_leave, name="leaves"),
    path('mon/', views.mark_monthly, name="monthly_leaves"),
    path('complain/', views.complain, name="issue_complain"),
    path('show/comp/lains/', views.show_complains, name="show_complains"),
]