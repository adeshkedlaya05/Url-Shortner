from django.db import models
from django.utils import timezone

class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=8, unique=True)
    expiration_time = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expiration_time
