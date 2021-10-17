from django.contrib import admin
from django.urls import path, include
from login import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('acc/', include('login.urls')),  
    path('emp/', include('employee.urls')),
    path('pass/', include('passmang.urls')),
]
