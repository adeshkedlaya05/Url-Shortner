
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),  # Home page
    path("shorten/", views.shorten_url, name="shorten_url"),  # URL shortening endpoint
    path("<str:code>/", views.redirect_to_original, name="redirect_url"),  # Redirect short code to original URL
]

