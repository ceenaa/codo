from django.urls import path, include
from .views import UserList

urlpatterns = [
    path('user/', UserList.as_view(), name='course-list'),

]
