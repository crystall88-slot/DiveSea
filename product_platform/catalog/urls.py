from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('connect-wallet/', views.connect_wallet, name='connect_wallet'),
    path('create-nft/', views.create_nft, name='create_nft'),
]
