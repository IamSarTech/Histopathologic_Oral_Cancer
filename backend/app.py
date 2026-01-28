from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
from werkzeug.utils import secure_filename
from tensorflow.keras.preprocessing import image

# ===============================
# App Setup
# ===============================
app = Flask(__name__)
CORS(app)

# ===============================
# Configuration
# ===============================
UPLOAD_FOLDER = "uploads"
MODEL_PATH = "model/keras_model.h5"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===============================
# Class Names (MATCH training order)
# ===============================
CLASS_NAMES = [
    "Oral Cancer",
    "Normal"
]

# ===============================
# Load Model
# ===============================
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("✅ Oral Cancer model loaded successfully")
    print("🔍 Input shape:", model.input_shape)
    print("🔍 Output shape:", model.output_shape)
except Exception as e:
    print("❌ Error loading model:", e)
    model = None

# ===============================
# Routes
# ===============================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Oral Cancer Detection API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        # ===============================
        # Preprocessing (Teachable Machine)
        # ===============================
        input_size = model.input_shape[1:3]

        img = image.load_img(filepath, target_size=input_size)
        img = image.img_to_array(img)
        img = (img / 127.5) - 1
        img = np.expand_dims(img, axis=0)

        # ===============================
        # Prediction
        # ===============================
        preds = model.predict(img, verbose=0)[0]
        predicted_index = int(np.argmax(preds))
        confidence = float(preds[predicted_index])

        # Safety check
        if predicted_index >= len(CLASS_NAMES):
            return jsonify({"error": "Invalid prediction index"}), 500

        prediction = CLASS_NAMES[predicted_index]

        print(f"✅ Prediction: {prediction} ({confidence * 100:.2f}%)")

        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence * 100, 2),
            "image_url": f"http://127.0.0.1:5000/uploads/{filename}"
        })

    except Exception as e:
        print("❌ Prediction error:", e)
        return jsonify({"error": "Failed to process image"}), 500

# ===============================
# Serve Uploaded Images
# ===============================
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ===============================
# Run Server
# ===============================
if __name__ == "__main__":
    app.run(debug=True)
