from django.db import models


# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email_address = models.EmailField(unique=True)
    overall_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)


class Rate(models.Model):
    date = models.DateField()
    source = models.ForeignKey(User, on_delete=models.CASCADE, related_name='source')
    destination = models.ForeignKey(User, on_delete=models.CASCADE, related_name='destination')
    rate = models.DecimalField(max_digits=5, decimal_places=2)


class base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
