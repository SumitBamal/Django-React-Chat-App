from rest_framework import serializers
from .models import  Myapp

class MyappSerilizer(serializers.ModelSerializer):
    class Meta:
        model  = Myapp
        fields = ('name',)