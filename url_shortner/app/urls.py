from django.urls import path, re_path
from .views import shorten_url, redirect_to_original, ReactAppView

urlpatterns = [
    # Removed 'api/' prefix here
    path('shorten/', shorten_url, name='shorten_url'),
    path('<str:code>/', redirect_to_original, name='redirect_to_original'),

    # Catch all other paths and serve React app
    re_path(r'^.*$', ReactAppView.as_view(), name='react_app'),
]
