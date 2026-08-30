from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .services.gemini import get_ai_response

class ChatView(APIView):
    def post(self, request):
        message = request.data.get("message")

        if not message:
            return Response(
                {"detail": "Message is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ai_message = get_ai_response(message)

        return Response({
            "message": ai_message
        })
