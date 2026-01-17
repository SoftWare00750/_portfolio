import React, { useState, useEffect } from 'react';

const LOADING_TEXTS = [
  "Web Developer",
  "Frontend Developer",
  "Mobile Developer",
  "React.js",
  "Angular.js",
  "Vue.js",
  "React-native"
];

const LoadingScreen = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Global CSS for animations and media queries */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (max-width: 768px) {
          .loading-title {
            position: absolute !important; 
            font-size: 1.8rem !important;
            margin-bottom: 2rem !important; /* Reduced from 6rem */
            padding-top: 10px;
            margin-top: -180px !important; /* Move text higher up */
            top: 40% !important;
          }
          
          .spinnerStyle {
            margin-top: -60px !important; /* Move spinner higher up */
          }
        }

        @media (max-width: 480px) {
          .loading-title {
            font-size: 1.5rem !important;
            margin-top: -140px !important; /* Move even higher on smaller screens */
          }
          
          .spinnerStyle {
            margin-top: -120px !important;
          }
        }
      `}</style>

      {/* Main Container */}
      <div style={containerStyle}>
        
        {/* Rotating Text */}
        <h1 className="loading-title" style={textStyle}>
          {LOADING_TEXTS[currentTextIndex]}
        </h1>

        {/* Loading Spinner */}
        <div className="spinnerStyle" style={spinnerStyle}></div>
        
      </div>
    </>
  );
};

// --- Styles ---

const containerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(180deg, #071028 0%, #071827 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  overflow: 'hidden',
  animation: 'fadeOut 0.5s ease-out 2s forwards' 
};

const textStyle = {
  color: '#6ee7b7',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  marginBottom: '3rem',
  textAlign: 'center',
  transition: 'opacity 0.2s ease',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px'
};

const spinnerStyle = {
  width: '60px',
  height: '60px',
  border: '4px solid rgba(238, 242, 255, 0.2)',
  borderTop: '4px solid #eef2ff',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite'
};

export default LoadingScreen;