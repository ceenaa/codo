from .models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .serializers import UserSerializer, RateSerializer, CreateUserSerializer
from backend.logic.userLogics import Calculate_over_all_rate, Save_rate


# Create your views here.

class UserList(APIView):

    @extend_schema(
        parameters=[
            OpenApiParameter(name='name', description='Filter by name', required=False, type=str),
        ],
        responses=UserSerializer(many=True)

    )
    def get(self, request):  # queryset = User.objects.filter(is_active=True)
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = User.objects.filter(user_name__icontains=name)

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(
        request=CreateUserSerializer,
        responses=UserSerializer

    )
    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class RateList(APIView):
    @extend_schema(
        parameters=[
            OpenApiParameter(name='source', description='Filter by source', required=False, type=int),
            OpenApiParameter(name='destination', description='Filter by destination', required=False, type=int),
        ],
        responses=RateSerializer(many=True)

    )
    def post(self, request):
        serializer = RateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Save_rate(serializer.data['source'], serializer.data['destination'], serializer.data['rate'])
            Calculate_over_all_rate(serializer.data['destination'], serializer.data['rate'])
            return Response(serializer.data)
        return Response(serializer.errors)
