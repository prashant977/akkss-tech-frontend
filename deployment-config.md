# Deployment Configuration Files

## vercel.json (Frontend)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "@api_url",
    "REACT_APP_RAZORPAY_KEY_ID": "@razorpay_key"
  }
}
```

## railway.toml (Backend)
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "python src/main.py"
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[env]
PORT = "5000"
```

## Dockerfile (Alternative Backend Deployment)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

EXPOSE 5000

CMD ["python", "src/main.py"]
```

## .env.production (Backend)
```bash
DATABASE_URL=mysql://user:pass@host:port/db
JWT_SECRET_KEY=super-secret-production-key
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your-secret-key
FLASK_ENV=production
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

