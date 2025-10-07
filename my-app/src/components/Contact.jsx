import React from "react";

export default function Contact() {
  return (
      <section id="contact" className="section alt">
            <div className="container">
                    <h2 className="section-title">Contact</h2>
                            <div className="contact-grid">
                                      <div>
                                                  <p>If you’d like to work together or have questions, reach out:</p>
                                                              <ul>
                                                                            <li>Email: <a href="mailto:otunes7175@gmail.com">otunes7175@gmail.com</a></li>
                                                                                          <li>Phone: +234 813 506 0798</li>
                                                                                                      </ul>
                                                                                                                </div>

                                                                                                                          <form className="contact-form" onSubmit={(e)=>{ e.preventDefault(); alert("Form demo — wire up backend or email service");}}>
                                                                                                                                      <label>
                                                                                                                                                    <input placeholder="Name" required />
                                                                                                                                                                </label>
                                                                                                                                                                            <label>
                                                                                                                                                                                          <input type="email" placeholder="Email" required />
                                                                                                                                                                                                      </label>
                                                                                                                                                                                                                  <label>
                                                                                                                                                                                                                                <textarea placeholder="Message" rows="6" required />
                                                                                                                                                                                                                                            </label>
                                                                                                                                                                                                                                                        <button className="btn" type="submit">Send message</button>
                                                                                                                                                                                                                                                                  </form>
                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                    </section>
                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      