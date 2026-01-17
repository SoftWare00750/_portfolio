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
      {/* 1. Global CSS for animations and media queries 
          (In a real app, move this to a .css file) 
      */}
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
            font-size: 1.8rem !important;
            margin-bottom: 6rem !important;
          }
            .spinnerStyle {
             top: 10%;
            }
        }

        @media (max-width: 480px) {
          .loading-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      {/* 2. Main Container */}
      <div style={containerStyle}>
        
        {/* Rotating Text */}
        <h1 className="loading-title" style={textStyle}>
          {LOADING_TEXTS[currentTextIndex]}
        </h1>

        {/* Loading Spinner */}
        <div style={spinnerStyle}></div>
        
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
  // Use animation property here
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