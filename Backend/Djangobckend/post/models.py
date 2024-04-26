from django.db import models

# Create your models here.


class Post(models.Model):
    # title = models.CharField(max_length=200, default="TITLE")
    # body = models.TextField()
    url = models.TextField()
    def __str__(self):
        return f"Post:{self.url}"


