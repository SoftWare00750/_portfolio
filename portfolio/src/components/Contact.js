import React, { useState } from "react";


export default function Contact() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
    setIsChatOpen(false);
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
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              Let's Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="chat-box">
          <h2>Send a Message 💬</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="button-group">
            <button className="button1">Send</button>

            <button className="button2" onClick={() => setIsChatOpen(false)} >
               Cancel
               </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
