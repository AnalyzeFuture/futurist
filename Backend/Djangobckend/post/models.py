from django.db import models

class Post(models.Model):
    cgpa = models.FloatField(default=0.00) 
    projects = models.IntegerField(default=0)
    workshops_certifications = models.IntegerField(default=0)
    skill_count = models.IntegerField(default=0)
    extracurricular_activities = models.IntegerField(default=0)

    def __str__(self):
        return f"Post: {self.cgpa}"

class Gemini(models.Model):
    url = models.URLField()

    def __str__(self):
        return f"Gemini: {self.url}"
