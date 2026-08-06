import React from "react";

// ─────────────────────────────────────────────────────────────
// Update your real profile links here. Nothing else needs to
// change — the icons and colors are already wired up below.
// ─────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SoftWare00750?tab=repositories",
    icon: "https://cdn.simpleicons.org/github/white",
    color: "#181717",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/Stephtunzzz", // TODO: replace with your actual X (Twitter) profile URL
    icon: "https://cdn.simpleicons.org/x/white",
    color: "#000000",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "www.linkedin.com/in/stephen-o-2245401b7", // TODO: replace with your actual Instagram profile URL
    icon: "https://icons8.com/icon/13930/linkedin",
    color: "#404be4",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/dami_tunz", // TODO: replace with your actual Instagram profile URL
    icon: "https://cdn.simpleicons.org/instagram/white",
    color: "#E4405F",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/+2349125174767", // TODO: replace with your actual WhatsApp number/link
    icon: "https://cdn.simpleicons.org/whatsapp/white",
    color: "#25D366",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="socials">
          {SOCIAL_LINKS.map(({ id, label, href, icon, color }) => (
            <a
              key={id}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span
                className="social-icon-circle"
                style={{ backgroundColor: color, "--brand-color": color }}
              >
                <img src={icon} alt={label} className="social-icon" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}