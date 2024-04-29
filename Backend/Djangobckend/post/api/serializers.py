from rest_framework.serializers import ModelSerializer
from ..models import Post
from ..models import Gemini
class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','cgpa','projects','workshops_certifications','skill_count','extracurricular_activities')

class GeminiSerializer(ModelSerializer):
    class GenAi:
        model = Gemini
        fields = ('id','url')
    