from rest_framework import status
from rest_framework.test import APITestCase


class ChatViewTests(APITestCase):
    def test_returns_message(self):
        response = self.client.post(
            '/api/chat/',
            {'message': 'hello'},
            format='json',
            HTTP_HOST='localhost',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'message': 'You said: hello'})

    def test_requires_message(self):
        response = self.client.post(
            '/api/chat/',
            {},
            format='json',
            HTTP_HOST='localhost',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {'detail': 'Message is required'})
