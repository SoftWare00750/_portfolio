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
  const [isDark, setIsDark] = useState(true); // default dark until detected

  // Detect and follow theme changes
  useEffect(() => {
    const getTheme = () =>
      document.documentElement.getAttribute('data-theme') !== 'light';

    setIsDark(getTheme());

    const observer = new MutationObserver(() => setIsDark(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Rotate loading texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // ── Theme tokens ──────────────────────────────────────
  const bg        = isDark
    ? 'linear-gradient(180deg, #071028 0%, #071827 100%)'
    : 'linear-gradient(180deg, #f4f7fb 0%, #e8edf5 100%)';
  const textColor = isDark ? '#6ee7b7' : '#1779cf';
  const spinnerBorder      = isDark ? 'rgba(238,242,255,0.2)' : 'rgba(23,121,207,0.2)';
  const spinnerTopColor    = isDark ? '#eef2ff' : '#1779cf';

  return (
    <>
      <style>{`
        @keyframes loadingSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loadingFadeOut {
          to { opacity: 0; visibility: hidden; }
        }
        @keyframes loadingPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
        .loading-title {
          animation: loadingPulse 1.4s ease-in-out infinite;
        }
        .loading-spinner {
          animation: loadingSpin 0.8s linear infinite;
        }

        /* ── Responsive overrides ── */
        @media (max-width: 768px) {
          .loading-title  { font-size: 1.8rem !important; }
          .loading-spinner { width: 48px !important; height: 48px !important; }
        }
        @media (max-width: 480px) {
          .loading-title  { font-size: 1.4rem !important; }
        }
      `}</style>

      {/* Container */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem',
        zIndex: 10000,
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        animation: 'loadingFadeOut 0.5s ease-out 2s forwards',
      }}>


        {/* Rotating text */}
        <h1
          className="loading-title"
          style={{
            color: textColor,
            fontSize: '2.4rem',
            fontWeight: 700,
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
            textAlign: 'center',
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            letterSpacing: '-0.02em',
            transition: 'color 0.3s ease',
          }}
        >
          {LOADING_TEXTS[currentTextIndex]}
        </h1>

        {/* Spinner */}
        <div
          className="loading-spinner"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: `4px solid ${spinnerBorder}`,
            borderTop: `4px solid ${spinnerTopColor}`,
            flexShrink: 0,
            transition: 'border-color 0.3s ease',
          }}
        />

      </div>
    </>
  );
};

export default LoadingScreen;