import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDown, Leaf, CircleCheck, LineChart } from "lucide-react";
import ChatBot from "../components/ChatBot";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);

  const handleUploadRedirect = () => {
    navigate("/upload");
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h2 className="header-title">Oral Cancer Detection</h2>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/creators" className="nav-link">Creators</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Oral Cancer Prediction</h1>
          <p className="hero-description">
            Upload a photo of the oral cavity or lesion to screen for signs of oral cancer and pre-cancerous conditions.
          </p>
          <div className="button-container">
            <button 
              onClick={handleUploadRedirect}
              className="upload-button"
            >
              Upload Image
            </button>
            <button 
              onClick={() => scrollToSection(featuresRef)} 
              className="learn-more-button"
            >
              Learn More <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section">
        <div className="section-container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {[
              { 
                icon: <Leaf className="feature-icon" size={40} />, 
                title: "Screening Accuracy", 
                description: "Our AI model helps identify suspicious lesions and classify potential risk with robust accuracy." 
              },
              { 
                icon: <CircleCheck className="feature-icon" size={40} />, 
                title: "Fast Screening", 
                description: "Get rapid screening results after uploading oral images to help guide next steps." 
              },
              { 
                icon: <LineChart className="feature-icon" size={40} />, 
                title: "Care Guidance", 
                description: "Receive recommendations for follow-up, specialist referral, and early intervention pathways." 
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div>{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>Oral Cancer Detection</h3>
            <p>Supporting early detection of oral cancer through AI-assisted image screening and referral guidance.</p>
          </div>
          <p className="copyright">© 2025 Oral Cancer Detection. All rights reserved.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Home;
