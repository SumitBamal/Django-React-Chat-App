"""URL's for the chat app."""

from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('chat/', views.ChatSessionView.as_view()),
    path('chat/<uri>/', views.ChatSessionView.as_view()),
    path('chat/<uri>/messages/', views.ChatSessionMessageView.as_view()),
    path('chatbot/', views.ChatBotView.as_view()),
]
