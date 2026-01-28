import React from "react";
import { Microscope, AlertTriangle, Shield, Brain } from "lucide-react";
import "./About.css";

const About = () => {
  const classifications = [
    {
      name: "Oral Squamous Cell Carcinoma (OSCC)",
      description: "OSCC is the most common type of oral cancer, accounting for over 90% of all oral malignancies. It arises from the squamous cells that line the oral cavity.",
      characteristics: [
        "Atypical squamous cells with enlarged, hyperchromatic nuclei",
        "Keratin pearl formation in well-differentiated tumors",
        "Invasion into underlying connective tissue",
        "Increased mitotic activity and cellular pleomorphism",
        "Loss of normal epithelial architecture"
      ],
      riskFactors: [
        "Tobacco use (smoking and smokeless tobacco)",
        "Heavy alcohol consumption",
        "Human Papillomavirus (HPV) infection",
        "Betel quid and areca nut chewing",
        "Chronic sun exposure (for lip cancer)",
        "Poor oral hygiene and dental care"
      ],
      icon: <AlertTriangle size={40} color="#ef4444" />
    },
    {
      name: "Normal Oral Tissue",
      description: "Normal oral mucosa consists of stratified squamous epithelium with underlying connective tissue (lamina propria). Healthy tissue shows orderly cell maturation and intact basement membrane.",
      characteristics: [
        "Regular stratified squamous epithelium layers",
        "Normal nuclear-to-cytoplasmic ratio",
        "Intact basement membrane",
        "Orderly cell maturation from basal to superficial layers",
        "Healthy underlying connective tissue"
      ],
      riskFactors: [
        "Maintain regular dental checkups",
        "Practice good oral hygiene",
        "Avoid tobacco and excessive alcohol",
        "Eat a balanced diet rich in fruits and vegetables",
        "Perform monthly oral self-examinations",
        "Stay hydrated and protect lips from sun exposure"
      ],
      icon: <Shield size={40} color="#16a34a" />
    }
  ];

  return (
    <div className="about-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h2 className="header-title">Oral Cancer Detection</h2>
          <nav className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main className="about-main">
        <div className="about-content">
          <div className="about-hero">
            <div className="microscope-icon">
              <Microscope size={60} className="icon-green" />
            </div>
            <h1 className="about-title">About Oral Cancer Detection</h1>
            <p className="about-subtitle">
              AI-Powered Histopathologic Image Analysis for Early Cancer Detection
            </p>
          </div>
          
          <div className="mission-section">
            <div className="mission-header">
              <Brain size={28} className="icon-green" />
              <h2 className="mission-title">Our Mission</h2>
            </div>
            <p className="mission-text">
              The Oral Cancer Detection project leverages advanced deep learning technology to assist pathologists and healthcare professionals in the early detection of oral squamous cell carcinoma (OSCC) through histopathologic image analysis.
            </p>
            <p className="mission-text">
              Our AI model has been trained on thousands of histopathologic images to accurately differentiate between OSCC and normal oral tissue, providing rapid screening support that can help expedite diagnosis and treatment planning.
            </p>
            <p className="mission-text">
              Early detection of oral cancer significantly improves patient outcomes, with 5-year survival rates exceeding 80% when detected at early stages compared to less than 40% for late-stage diagnoses.
            </p>
          </div>

          <div className="how-it-works">
            <h2 className="how-it-works-title">How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Upload</h3>
                <p className="step-description">Submit histopathologic images of oral tissue samples</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Analyze</h3>
                <p className="step-description">AI processes and examines cellular patterns</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Results</h3>
                <p className="step-description">Receive classification with detailed insights</p>
              </div>
            </div>
          </div>
          
          <h2 className="classifications-title">Classification Categories</h2>
          
          <div className="classifications-container">
            {classifications.map((item, index) => (
              <div key={index} className="classification-card">
                <div className="classification-header">
                  {item.icon}
                  <h3 className="classification-name">{item.name}</h3>
                </div>
                <p className="classification-description">{item.description}</p>
                
                <div className="classification-details">
                  <div className="details-column">
                    <h4 className="details-heading">
                      {item.name.includes("OSCC") ? "Histological Features:" : "Healthy Tissue Features:"}
                    </h4>
                    <ul className="details-list">
                      {item.characteristics.map((char, i) => (
                        <li key={i} className="details-item">{char}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="details-column">
                    <h4 className="details-heading">
                      {item.name.includes("OSCC") ? "Risk Factors:" : "Prevention Tips:"}
                    </h4>
                    <ul className="details-list">
                      {item.riskFactors.map((factor, i) => (
                        <li key={i} className="details-item">{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="disclaimer-section">
            <h2 className="disclaimer-title">Important Disclaimer</h2>
            <p className="disclaimer-text">
              This AI-powered analysis is intended for screening and educational purposes only. It should not replace professional medical diagnosis. All results should be reviewed and confirmed by a qualified pathologist or healthcare professional.
            </p>
            <a href="/upload" className="try-detection-button">
              Try Cancer Detection
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>Oral Cancer Detection</h3>
            <p>Supporting early detection of oral cancer through AI-assisted image screening and referral guidance.</p>
          </div>
          <p className="copyright">© 2025 Oral Cancer Detection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;