from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class ChatView(APIView):
    def post(self, request):
        message = request.data.get("message")

        if not message:
            return Response(
                {"detail": "Message is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({
            "message": f"You said: {message}"
        })
