import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

# Load env vars
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("Missing GEMINI_API_KEY")

app = Flask(__name__)
CORS(app)

# ✅ Correct Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

@app.route("/", methods=["GET"])
def home():
    return "✅ Medical chatbot running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        user_message = request.json.get("message", "").strip()
        if not user_message:
            return jsonify({"reply": "Please enter a message"}), 400

        prompt = f"""
You are OralCure, a medical education chatbot.

INSTRUCTIONS (follow exactly):
- Output EXACTLY 5 bullet points.
- Each bullet must be a SINGLE sentence.
- Do NOT repeat ideas across bullets.
- Do NOT restate the same advice in different words.
- No introductions, headings, or summaries.
- Educational information only (no diagnosis or treatment).
- The FINAL bullet must advise consulting a medical professional.

FORMAT (copy exactly, including bullet symbol):
• Bullet one sentence.
• Bullet two sentence.
• Bullet three sentence.
• Bullet four sentence.
• Bullet five sentence advising consultation with a medical professional.

User question:
{user_message}
"""


        # ✅ CORRECT METHOD for google-genai v1.60.0
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=prompt
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("❌ AI ERROR:", repr(e))
        return jsonify({"reply": "AI chatbot error"}), 500

if __name__ == "__main__":
    # Disable reloader to avoid stale imports
    app.run(port=5001, debug=False, use_reloader=False)
