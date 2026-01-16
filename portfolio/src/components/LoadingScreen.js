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
    <div className="loading-screen">
      {/* Rotating Text */}
      <h1 className="loading-text">
        {texts[currentTextIndex]}
      </h1>

      {/* Loading Spinner */}
      <div className="loading-spinner"></div>

      {/* Inline styles to ensure they load immediately */}
      <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(180deg, #071028 0%, #071827 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
        }

        .loading-text {
          color: #6ee7b7;
          font-size: 4rem;
          font-weight: bold;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          margin-bottom: 3rem;
          text-align: center;
          min-height: 60px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          animation: fadeText 0.5s ease-in-out;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(238, 242, 255, 0.2);
          border-top: 4px solid #eef2ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeText {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .loading-text {
            font-size: 1.8rem;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .loading-text {
            font-size: 1.5rem;
          }
          
          .loading-spinner {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;