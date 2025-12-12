import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Animate navbar on page load
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('animate'); // Add the animate class to the navbar on load
      }
    };

    // Animate hero section on page load
    const animateHero = () => {
      const heroName = document.querySelector('.hero-name');
      const heroSubFixed = document.querySelector('.hero-sub-right-fixed');
      const heroSub2 = document.querySelector('.hero-sub-right2');

      if (heroName) {
        setTimeout(() => heroName.classList.add('animate'), 400);
      }
      if (heroSubFixed) {
        setTimeout(() => heroSubFixed.classList.add('animate'), 600);
      }
      if (heroSub2) {
        setTimeout(() => heroSub2.classList.add('animate'), 600);
      }
    };

    // Observer for scroll-triggered animations for other sections
    const createScrollObserver = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // For parent containers, animate children
            if (entry.target.classList.contains('about-grid')) {
              const aboutText = entry.target.querySelector('.about-text');
              const aboutImage = entry.target.querySelector('.about-image');
              if (aboutText) aboutText.classList.add('animate');
              if (aboutImage) aboutImage.classList.add('animate');
            }

            if (entry.target.classList.contains('skills-grid')) {
              const skillItems = entry.target.querySelectorAll('.skill-item');
              skillItems.forEach(item => item.classList.add('animate'));
            }

            if (entry.target.classList.contains('projects-grid')) {
              const projectCards = entry.target.querySelectorAll('.project-card');
              projectCards.forEach(card => card.classList.add('animate'));
            }
          }
        });
      }, observerOptions);

      // Observe all section titles
      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => observer.observe(title));

      // Observe specific sections
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) observer.observe(projectsGrid);

      const aboutGrid = document.querySelector('.about-grid');
      if (aboutGrid) observer.observe(aboutGrid);

      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) observer.observe(skillsGrid);

      const contactContainer = document.querySelector('.contact-container');
      if (contactContainer) observer.observe(contactContainer);

      const footer = document.querySelector('.footer');
      if (footer) observer.observe(footer);

      return observer;
    };

    // Special handler for hero image to animate when scrolled to the bottom of `.nav-sub-right-fixed`
    const handleHeroImageScroll = () => {
      const heroImage = document.querySelector('.hero-image');
      const navSubRightFixed = document.querySelector('.nav-sub-right-fixed');
      if (!heroImage || !navSubRightFixed) return null;

      const observerOptions = {
        threshold: 1.0, // Trigger when 100% of `.nav-sub-right-fixed` is in view
      };

      // IntersectionObserver to trigger the animation when `.nav-sub-right-fixed` is in view
      const heroImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate hero image when the bottom of `.nav-sub-right-fixed` is in view
            heroImage.classList.add('animate');
            // Disconnect the observer after triggering the animation
            heroImageObserver.disconnect();
          }
        });
      }, observerOptions);

      heroImageObserver.observe(navSubRightFixed);

      return heroImageObserver;
    };

    // Initialize all animations
    animateNavbar();
    animateHero();
    const observer = createScrollObserver();
    const heroImageObserver = handleHeroImageScroll();

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (heroImageObserver) {
        heroImageObserver.disconnect();
      }
    };
  }, []); // Empty dependency array to ensure this runs once after the component mounts
};

export default useScrollAnimation;
