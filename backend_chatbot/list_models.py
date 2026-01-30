from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

print("📋 Available models:\n")

for model in client.models.list():
    print("Model name:", model.name)
