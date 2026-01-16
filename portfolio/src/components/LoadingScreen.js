import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const texts = [
    "Web Developer",
    "Frontend Developer",
    "Mobile Developer",
    "React.js",
    "Angular.js",
    "Vue.js",
    "React-native"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
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
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Rotating Text */}
      <h1 style={{
        color: '#6ee7b7',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        marginBottom: '3rem',
        textAlign: 'center',
        transition: 'opacity 0.3s ease',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        {texts[currentTextIndex]}
      </h1>

      {/* Loading Spinner */}
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(238, 242, 255, 0.2)',
        borderTop: '4px solid #eef2ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>

      {/* Keyframes for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;