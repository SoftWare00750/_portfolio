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
    <>
      <div className="loading-screen">
        {/* Rotating Text */}
        <h1 className="loading-text">
          {texts[currentTextIndex]}
        </h1>

        {/* Loading Spinner */}
        <div className="loading-spinner"></div>
      </div>

      {/* Inline styles with !important to ensure they load immediately */}
      <style>{`
        /* CRITICAL: Force loading screen to be visible above everything */
        .loading-screen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: linear-gradient(180deg, #071028 0%, #071827 100%) !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          z-index: 99999 !important; /* Maximum z-index */
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .loading-text {
          color: #6ee7b7 !important;
          font-size: 4rem !important;
          font-weight: bold !important;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif !important;
          margin: 0 !important;
          margin-bottom: 3rem !important;
          text-align: center !important;
          min-height: 60px !important;
          display: flex !important;
          align-items: center !important;
          padding: 0 20px !important;
          animation: fadeText 0.5s ease-in-out !important;
        }

        .loading-spinner {
          width: 60px !important;
          height: 60px !important;
          border: 4px solid rgba(238, 242, 255, 0.2) !important;
          border-top: 4px solid #eef2ff !important;
          border-radius: 50% !important;
          animation: spin 1s linear infinite !important;
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
            font-size: 1.8rem !important;
          }
          
          .loading-spinner {
            width: 50px !important;
            height: 50px !important;
          }
        }

        @media (max-width: 480px) {
          .loading-text {
            font-size: 1.5rem !important;
          }
          
          .loading-spinner {
            width: 45px !important;
            height: 45px !important;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingScreen;