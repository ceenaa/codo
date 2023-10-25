from django.db import models


# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email_address = models.EmailField(unique=True)
    overall_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    count_of_rates = models.IntegerField(default=0)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Rate(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    source = models.ForeignKey(User, on_delete=models.CASCADE, related_name='source')
    destination = models.ForeignKey(User, on_delete=models.CASCADE, related_name='destination')
    rate = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.source.first_name + ' ' + self.source.last_name + ' -> ' + self.destination.first_name + ' ' + self.destination.last_name + ' : ' + str(self.rate)


class base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
