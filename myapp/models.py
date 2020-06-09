from django.db import models

class Myapp(models.Model):
    name  = models.CharField(max_length = 100)
        