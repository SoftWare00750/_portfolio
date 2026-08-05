import React from "react";

export default function Footer() {
  return (
      <footer className="footer">
            <div className="container">
                  <div className="socials">
                        <a
                          href="https://github.com/SoftWare00750?tab=repositories"
                          aria-label="github"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          <img
                            src="/assets/github.png"
                            alt="GitHub"
                            className="github-icon social-icon"
                          />
                        </a>

                        {/* TODO: replace with your actual X (Twitter) profile URL */}
                        <a
                          href="https://x.com/your_username"
                          aria-label="x"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          <span className="social-icon-circle">
                            <img
                              src="https://cdn.simpleicons.org/x/white"
                              alt="X"
                              className="social-icon"
                            />
                          </span>
                        </a>

                        {/* TODO: replace with your actual Instagram profile URL */}
                        <a
                          href="https://instagram.com/your_username"
                          aria-label="instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          <span className="social-icon-circle">
                            <img
                              src="https://cdn.simpleicons.org/instagram/white"
                              alt="Instagram"
                              className="social-icon"
                            />
                          </span>
                        </a>

                        {/* TODO: replace with your actual WhatsApp number/link, e.g. https://wa.me/1234567890 */}
                        <a
                          href="https://wa.me/1234567890"
                          aria-label="whatsapp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          <span className="social-icon-circle">
                            <img
                              src="https://cdn.simpleicons.org/whatsapp/white"
                              alt="WhatsApp"
                              className="social-icon"
                            />
                          </span>
                        </a>
                  </div>
            </div>
      </footer>
  );
}