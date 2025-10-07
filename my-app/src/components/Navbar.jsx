import React, { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
    { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
          { id: "contact", label: "Contact" },
          ];

          export default function Navbar() {
            const [open, setOpen] = useState(false);
              const [scrolled, setScrolled] = useState(false);

                useEffect(() => {
                    const onScroll = () => setScrolled(window.scrollY > 40);
                        window.addEventListener("scroll", onScroll);
                            return () => window.removeEventListener("scroll", onScroll);
                              }, []);

                                const goTo = (id) => {
                                    setOpen(false);
                                        const el = document.getElementById(id);
                                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                              };

                                                return (
                                                    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
                                                          <div className="container nav-inner">
                                                                  <div className="brand" onClick={() => goTo("home")}>
                                                                            <div className="logo-circle">O</div>
                                                                                      <span className="brand-name">Oluwadamilola Otunla</span>
                                                                                              </div>

                                                                                                      <nav className={`nav ${open ? "open" : ""}`}>
                                                                                                                {navItems.map((n) => (
                                                                                                                            <button key={n.id} className="nav-link" onClick={() => goTo(n.id)}>
                                                                                                                                          {n.label}
                                                                                                                                                      </button>
                                                                                                                                                                ))}
                                                                                                                                                                        </nav>

                                                                                                                                                                                <button className="nav-toggle" onClick={() => setOpen(!open)}>
                                                                                                                                                                                          <span className="hamburger" />
                                                                                                                                                                                                  </button>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                            </header>
                                                                                                                                                                                                              );
                                                                                                                                                                                                              }
                                                                                                                                                                                                              