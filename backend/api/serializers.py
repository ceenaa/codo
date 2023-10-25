from .models import User, Rate
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    rates = serializers.PrimaryKeyRelatedField(many=True, queryset=Rate.objects.all())

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email_address', 'overall_rate']


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ['id', 'date', 'source', 'destination', 'rate']
