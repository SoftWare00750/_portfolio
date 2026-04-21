// Contact.js — Updated with Firebase Firestore integration
// Replace your existing portfolio/src/components/Contact.js with this file.
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com and create a project
// 2. Enable Firestore Database (start in test mode for now)
// 3. Go to Project Settings → General → Your apps → Add app (Web)
// 4. Copy your Firebase config and paste it below
// 5. In your project root run: npm install firebase
// 6. Messages sent via "Let's Chat" will appear in your admin portal

import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ─── PASTE YOUR FIREBASE CONFIG HERE ──────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyB441kQiyA0gQqn0SYzTyZRFGdV9yApr3w",
  authDomain: "adminportal-aa5be.firebaseapp.com",
  projectId: "adminportal-aa5be",
  storageBucket: "adminportal-aa5be.firebasestorage.app",
  messagingSenderId: "305884449303",
  appId: "1:305884449303:web:ab736564654f733bda2a52",
  measurementId: "G-DWRC9ND9NP"
};
// ──────────────────────────────────────────────────────────────────────────────

// Initialise Firebase (safe to call multiple times – reuses existing app)
let app;
let db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  // App already initialised (hot-reload)
  const { getApp } = require("firebase/app");
  app = getApp();
  db = getFirestore(app);
}

export default function Contact() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        read: false,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Auto-close and reset after 2 s
      setTimeout(() => {
        setIsChatOpen(false);
        setStatus("idle");
      }, 2000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section alt">
      <div className="contact-container">
        <div className="contact-box">
          <h2 id="contact-header">Let's Connect</h2>
          <h3 className="contact1">
            If you would like to work together or have questions, reach out
          </h3>
          <h3 className="contact2">Drop me an email or chat with me!</h3>
          <p className="contact3">
            Whether you want something fixed or built,<br />
            I'm sure we'll find something we could work together on!
          </p>

          <div className="contact-buttons">
            <button
              className="contact-btn"
              onClick={() => (window.location.href = "mailto:otunes7175@gmail.com")}
            >
              Email Me
            </button>

            <button
              className="contact-btn"
              onClick={() => { setIsChatOpen(!isChatOpen); setStatus("idle"); }}
            >
              Let's Chat
            </button>
          </div>
        </div>
      </div>

      {/* ── Chat Box ── */}
      {isChatOpen && (
        <div className="chat-box">
          <h2>Send a Message 💬</h2>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
              <p style={{ color: "#6ee7b7", fontWeight: "bold", fontSize: "16px" }}>
                Message sent! I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "sending"}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "sending"}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "sending"}
              />

              {status === "error" && (
                <p style={{ color: "#f87171", fontSize: "13px", textAlign: "center", marginBottom: "8px" }}>
                  ⚠️ Failed to send. Please try again.
                </p>
              )}

              <div className="button-group">
                <button
                  className="button1"
                  type="submit"
                  disabled={status === "sending"}
                  style={{ opacity: status === "sending" ? 0.6 : 1 }}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
                <button
                  className="button2"
                  type="button"
                  onClick={() => { setIsChatOpen(false); setStatus("idle"); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}