import os

from google import genai

client = genai.Client(
    api_key=os.environ.get("GEMINI_API_KEY")
)

def get_ai_response(message: str) -> str:
    response = client.models.generate_content(
        model = "gemini-3.5-flash-lite",
        contents=message,
    )

    return response.text