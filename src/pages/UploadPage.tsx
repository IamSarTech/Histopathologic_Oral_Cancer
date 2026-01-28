import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import ChatBot from "../components/ChatBot";
import "./Upload.css";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [solution, setSolution] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  /* =========================
     File handling
  ========================= */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  /* =========================
     Upload & predict
  ========================= */
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const predictedClass = data.prediction;

      setPrediction(predictedClass);
      setMessage(getDiseaseMessage(predictedClass));
      setSolution(getDiseaseSolution(predictedClass));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error processing the image. Try again.");
    }

    setLoading(false);
  };

  /* =========================
     OSCC vs Normal logic
  ========================= */
  const getDiseaseMessage = (disease: string) => {
    switch (disease) {
      case "Oral Cancer":
        return "Histopathologic features are consistent with Oral Squamous Cell Carcinoma (OSCC). Immediate specialist evaluation is recommended.";
      case "Normal":
        return "The histopathologic image shows normal oral tissue architecture with no evidence of malignancy.";
      default:
        return "Unable to determine the result. Please try another image.";
    }
  };

  const getDiseaseInfo = (disease: string) => {
    switch (disease) {
      case "Oral Cancer":
        return {
          cause:
            "Malignant transformation of oral epithelial cells, commonly associated with prolonged exposure to carcinogenic factors.",
          conditions: [
            "Tobacco smoking or smokeless tobacco use",
            "Excessive alcohol consumption",
            "Human Papillomavirus (HPV) infection",
            "Chronic oral mucosal irritation",
            "Poor oral hygiene"
          ],
          symptoms: [
            "Non-healing oral ulcer",
            "Cellular pleomorphism and dysplasia",
            "Abnormal epithelial thickening",
            "Pain, bleeding, or difficulty swallowing",
            "Invasion into underlying connective tissue"
          ]
        };

      case "Normal":
        return {
          cause:
            "Normal stratified squamous epithelium with preserved cellular morphology and tissue organization.",
          conditions: [
            "Healthy epithelial cell layers",
            "No dysplasia or abnormal mitotic activity"
          ],
          symptoms: [
            "Normal cellular appearance",
            "No ulceration or malignant features"
          ]
        };

      default:
        return { cause: "", conditions: [], symptoms: [] };
    }
  };

  const getDiseaseSolution = (disease: string) => {
    switch (disease) {
      case "Oral Cancer":
        return (
          "1. Consult an oral pathologist, ENT specialist, or oncologist immediately.\n" +
          "2. Histopathologic biopsy confirmation is essential.\n" +
          "3. Early diagnosis significantly improves prognosis and treatment outcomes.\n" +
          "4. Follow recommended clinical staging and treatment protocols."
        );

      case "Normal":
        return (
          "1. Maintain good oral hygiene practices.\n" +
          "2. Avoid tobacco products and limit alcohol consumption.\n" +
          "3. Schedule regular dental and oral health check-ups.\n" +
          "4. Seek professional evaluation if any oral lesions or symptoms develop."
        );

      default:
        return "";
    }
  };

  /* =========================
     UI (UNCHANGED layout)
  ========================= */
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link
            to="/"
            className="nav-link"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h2 className="header-title">Oral Cancer Detection</h2>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </header>

      {/* Upload Section */}
      <main className="hero-section">
        <div className="hero-content" style={{ maxWidth: "700px" }}>
          <h1 className="hero-title">Upload & Analyze</h1>
          <p className="hero-description">
            Upload a histopathologic (microscopic) image of oral tissue for AI-assisted classification into OSCC or Normal tissue.
          </p>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              padding: "2rem",
              borderRadius: "1rem",
              marginBottom: "1.5rem"
            }}
          >
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: "2rem",
                border: "2px dashed #16a34a",
                borderRadius: "0.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginBottom: "1rem"
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Upload size={32} color="#16a34a" />
              <span style={{ color: "#374151" }}>Click to select an image</span>
            </label>

            {preview && (
              <div
                style={{
                  marginBottom: "1rem",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb"
                }}
              >
                <img src={preview} alt="Preview" style={{ width: "100%", height: "auto" }} />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="upload-button"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>

          {prediction && (
            <div
              style={{
                background: prediction === "Normal" ? "#f0fdf4" : "#fef2f2",
                border:
                  prediction === "Normal"
                    ? "1px solid #16a34a"
                    : "1px solid #ef4444",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "left"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem"
                }}
              >
                {prediction === "Normal" ? (
                  <CheckCircle size={28} color="#16a34a" />
                ) : (
                  <AlertCircle size={28} color="#ef4444" />
                )}
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1f2937" }}>
                  {message}
                </h2>
              </div>

              <div style={{ display: "grid", gap: "1rem" }}>
                <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                  <h3 style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.5rem" }}>
                    Cause
                  </h3>
                  <p>{getDiseaseInfo(prediction).cause}</p>
                </div>

                <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                  <h3 style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.5rem" }}>
                    Associated Factors
                  </h3>
                  <ul>
                    {getDiseaseInfo(prediction).conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                  <h3 style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.5rem" }}>
                    Histopathologic Features
                  </h3>
                  <ul>
                    {getDiseaseInfo(prediction).symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                  <h3 style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.5rem" }}>
                    Recommendations
                  </h3>
                  <p style={{ whiteSpace: "pre-line" }}>{solution}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>Oral Cancer Detection</h3>
            <p>AI-assisted histopathologic screening for early detection of OSCC.</p>
          </div>
          <p className="copyright">
            © 2025 Oral Cancer Detection. All rights reserved.
          </p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default UploadPage;
