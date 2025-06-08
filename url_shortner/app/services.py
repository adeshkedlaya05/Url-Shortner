import uuid
from datetime import timedelta
from django.utils import timezone
from .models import ShortURL

class URLShortenerService:
    def __init__(self, url: str, hrs: int, mins: int, secs: int):
        self.url = url
        self.duration = timedelta(hours=hrs, minutes=mins, seconds=secs)

    def generate_short_code(self) -> str:
        return uuid.uuid4().hex[:6]

    def create_short_url(self) -> ShortURL:
        short_code = self.generate_short_code()
        expiration_time = timezone.now() + self.duration

        return ShortURL.objects.create(
            original_url=self.url,
            short_code=short_code,
            expiration_time=expiration_time
        )
