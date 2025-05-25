from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect, Http404
from django.views.decorators.csrf import csrf_exempt
from .models import ShortURL
from .services import URLShortenerService

@csrf_exempt
def shorten_url(request):
    if request.method == "POST":
        url = request.POST.get("url")
        hrs = int(request.POST.get("hrs", 0))
        mins = int(request.POST.get("mins", 0))
        secs = int(request.POST.get("secs", 0))

        if not url or (hrs == 0 and mins == 0 and secs == 0):
            return JsonResponse({"error": "Invalid input"}, status=400)

        service = URLShortenerService(url, hrs, mins, secs)
        short_url = service.create_short_url()
        return JsonResponse({"short_url": request.build_absolute_uri(f"/{short_url.short_code}/")})
    return JsonResponse({"error": "Invalid request"}, status=405)

def redirect_to_original(request, code):
    try:
        short_url = ShortURL.objects.get(short_code=code)
        if short_url.is_expired():
            return render(request, "not_found.html", status=404)
        return HttpResponseRedirect(short_url.original_url)
    except ShortURL.DoesNotExist:
        return render(request, "not_found.html", status=404)

def home(request):
    return render(request, "home.html")
