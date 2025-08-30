# API Configuration Guide

This guide will help you configure the API keys needed for the Movie & Music Explorer.

## 🎬 TMDB API (The Movie Database)

### Step by Step:

1. **Create an account**

   - Visit [TMDB](https://www.themoviedb.org/)
   - Click "Sign Up" and create your free account

2. **Request API key**

   - Log into your account
   - Go to Settings > API
   - Click "Request an API Key"
   - Choose "Developer"
   - Fill in the required information:
     - Application Name: "Movie Music Explorer"
     - Application URL: "http://localhost:5173" (or your domain)
     - Application Summary: "Personal project to explore movies and music"

3. **Get the key**
   - After approval (usually immediate), you will receive:
     - API Key (v3 auth)
     - API Read Access Token (v4 auth)
   - Use the **API Key (v3 auth)** in the project

## 🎵 Deezer API (via RapidAPI)

### Step by Step:

1. **Create RapidAPI account**

   - Visit [RapidAPI](https://rapidapi.com/)
   - Click "Sign Up" and create your free account

2. **Subscribe to Deezer API**

   - Search for "Deezer" or visit [Deezer API](https://rapidapi.com/deezerdevs/api/deezer-1/)
   - Click "Subscribe to Test"
   - Choose the "Basic" plan (free)
     - 500 requests/month
     - Rate Limit: 500 requests/month

3. **Get the key**
   - On the API page, go to the "Endpoints" tab
   - In the "X-RapidAPI-Key" header, you'll see your key
   - Copy the value (without quotes)

## 🔧 Project Configuration

### Method 1: Environment Variables (Recommended)

1. **Create .env file**

   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file**
   ```env
   VITE_TMDB_API_KEY=your_tmdb_key_here
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

### Method 2: Direct Editing

1. **Open src/services/api.js**
2. **Replace the constants:**
   ```javascript
   const TMDB_API_KEY = "your_tmdb_key_here";
   const RAPIDAPI_KEY = "your_rapidapi_key_here";
   ```

## 🧪 Testing the APIs

### Test TMDB API

```bash
curl "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY_HERE&language=en-US"
```

### Test Deezer API

```bash
curl -X GET "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem" \
  -H "X-RapidAPI-Key: YOUR_KEY_HERE" \
  -H "X-RapidAPI-Host: deezerdevs-deezer.p.rapidapi.com"
```

## 🚨 Troubleshooting

### 401 Error (Unauthorized)

- Check if the API key is correct
- Make sure there are no extra spaces
- For TMDB: confirm the key has been approved

### 429 Error (Rate Limit)

- You've exceeded the request limit
- For Deezer: wait until next month or upgrade plan
- For TMDB: the limit is very high (1000 requests/day)

### CORS Error

- CORS is already configured in the APIs
- If it persists, try using a CORS extension in the browser (development only)

### Network Error

- Check your internet connection
- Try accessing the API URLs directly in the browser

## 📊 Free Plan Limits

### TMDB

- ✅ 1,000 requests per day
- ✅ No data limit
- ✅ All features
- ✅ Commercial use allowed

### Deezer (RapidAPI)

- ⚠️ 500 requests per month
- ✅ 30-second preview
- ✅ Complete metadata
- ❌ Music downloads

## 🔐 Security

### ⚠️ Important:

- **Never** commit your API keys to Git
- Use environment variables in production
- For public applications, consider using a backend to protect keys
- The `.env` file is already in `.gitignore`

### For Production:

- Configure environment variables in your hosting service
- Use services like Vercel, Netlify, or Heroku
- Consider implementing rate limiting on the backend
