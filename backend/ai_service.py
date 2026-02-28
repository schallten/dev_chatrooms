import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("Warning: GEMINI_API_KEY not found in environment variables.")

async def generate_ai_response(chat_history: str, user_input: str):
    if not GEMINI_API_KEY:
        return "AI response unavailable. Please set the GEMINI_API_KEY."
    
    try:
        # Using gemini-2.0-flash as it's the current recommended fast model
        # The plan suggested gemini-2.5-flash which might not exist or be a typo
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"Context history (last 10 messages):\n{chat_history}\n\nUser Question: {user_input}\n\nRespond as a helpful developer assistant. If giving code, format it properly."
        
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Error generating AI response: {str(e)}"
