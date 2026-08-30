# Backend

## Local setup

From the `backend` directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/api/chat/`.

Copy `.env.example` to `.env` and provide environment variables before using
non-development settings. This project does not load `.env` automatically;
the variables must be present in the process environment.
