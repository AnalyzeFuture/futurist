from rest_framework.viewsets import ModelViewSet
from ..models import Post , Gemini 
from .serializers import PostSerializer ,GeminiSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re
import openai
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO
from rest_framework.decorators import action
from rest_framework.response import Response

class PostViewSet(ModelViewSet):
    queryset  = Post.objects.all()
    serializer_class = PostSerializer
    
    # @action(detail=False, methods=['post'])
    # def gemini_analysis(self, request):
    #     # Ensure you access the request object through self
    #     if request.method == 'POST':
    #         # Extract data from the POST request
    #         data = request.data
    #         image_url = data.get('image_url', data)
    #         # input_prompt = data.get('input_prompt',"heaj a")
            
    #         # Integrate your existing code to process the data and generate a response
    #         # Example:
    #         # img = load_image_from_url(image_url)
    #         # response = get_gemini_response(input_prompt, img).text
    #         # sections = extract_sections(response)

    #         # Return the response as JSON
    #         # return JsonResponse({'sections': sections})

    #         # For testing purposes, return a dummy response
    #         return Response({'message': f'POST request received successfully. Image URL: {image_url}'})
    #     else:
    #         # Handle other request methods (GET, PUT, etc.) if needed
    #         return Response({'error': 'Invalid request method'}, status=400)

class GeminiViewSet(ModelViewSet):
    queryset = Gemini.objects.all()
    serializer_class=GeminiSerializer
