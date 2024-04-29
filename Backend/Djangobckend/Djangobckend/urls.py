"""
URL configuration for Djangobckend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from post.api.views import PostViewSet
from post.resumeExtraction.extractdata import json_data_from_resume
from post.Predict.predict import predict
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Djangobckend.api.urls')),
    path('gemini-analysis/', include('Djangobckend.api.urls')),
    path('extract_info/' , json_data_from_resume  ),
    path('predict_cv/',predict),
]
