import json
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.conf import settings
from django.shortcuts import redirect
from .models import ShortURL
from .services import URLShortenerService
import os

# Single Responsibility: API view for shortening URL
@csrf_exempt
def shorten_url(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body.decode("utf-8"))
        url = data.get("url")
        hrs = int(data.get("hrs", 0))
        mins = int(data.get("mins", 0))
        secs = int(data.get("secs", 0))
    except (ValueError, TypeError, json.JSONDecodeError) as e:
        return JsonResponse({"error": f"Invalid input: {str(e)}"}, status=400)

    if not url or (hrs == 0 and mins == 0 and secs == 0):
        return JsonResponse(
            {"error": "Invalid input: URL and expiration time required."},
            status=400
        )

    try:
        service = URLShortenerService(url, hrs, mins, secs)
        short_url = service.create_short_url()
    except Exception as e:
        return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)

    return JsonResponse({
        "short_url": request.build_absolute_uri(f"/{short_url.short_code}/")
    })


# Single Responsibility: API view for redirecting short URLs
def redirect_to_original(request, code):
    try:
        short_url = ShortURL.objects.get(short_code=code)
        if short_url.is_expired():
            # Redirect to relative expired path
            return redirect('/expired')
        return redirect(short_url.original_url)
    except ShortURL.DoesNotExist:
        return redirect('/expired')


# Single Responsibility: Serve React frontend index.html (catch-all route)
class ReactAppView(View):
    def get(self, request, *args, **kwargs):
        try:
            index_path = os.path.join(settings.BASE_DIR, 'frontend_build', 'index.html')
            with open(index_path, 'r') as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponseNotFound("React index.html not found. Please build your frontend.")
