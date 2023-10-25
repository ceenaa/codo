from django.shortcuts import render

from backend.api.models import User
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.serializers import UserSerializer, RateSerializer
from backend.logic.userLogics import Calculate_over_all_rate, Save_rate


# Create your views here.

class UserList(APIView):
    def get(self, request):
        # queryset = User.objects.filter(is_active=True)
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = User.objects.filter(first_name__icontains=name)

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class RateList(APIView):
    def post(self, request):
        serializer = RateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Save_rate(serializer.data['source'], serializer.data['destination'], serializer.data['rate'])
            Calculate_over_all_rate(serializer.data['destination'], serializer.data['rate'])
            return Response(serializer.data)
        return Response(serializer.errors)

