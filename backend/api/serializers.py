from .models import User, Rate
from rest_framework import serializers


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ['id', 'date', 'source', 'destination', 'rate']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email_address']


class UserSerializer(serializers.ModelSerializer):
    rates = serializers.SerializerMethodField()

    def get_rates(self, obj):
        rates = Rate.objects.filter(source__id = obj.id)
        return RateSerializer(rates, many=True).data

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email_address', 'overall_rate', 'rates']
