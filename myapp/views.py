from django.shortcuts import render
from .serializers import MyappSerilizer
from rest_framework import generics
from .models import Myapp
class MyappListCreate(generics.ListCreateAPIView):
    queryset = Myapp.objects.all()
    serializer_class  = MyappSerilizer

