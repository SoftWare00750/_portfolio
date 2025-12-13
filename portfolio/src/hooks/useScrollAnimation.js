import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Animate navbar on page load
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('animate');
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
      // Hero image will be animated by scroll observer
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
            
            // Once animated, stop observing to prevent re-triggering
            observer.unobserve(entry.target);

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

      // Special observer for hero image with different threshold
      const heroImageOptions = {
        threshold: 0,
        rootMargin: '20px 0px -100% 0px', // Only trigger when 20px past the top
      };

      const heroImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Only animate when scrolling DOWN and image is 20px past viewport top
          if (!entry.isIntersecting && entry.boundingClientRect.top < -20) {
            const heroImage = document.querySelector('.hero-image');
            if (heroImage && !heroImage.classList.contains('animate')) {
              heroImage.classList.add('animate');
              heroImageObserver.unobserve(entry.target);
            }
          }
        });
      }, heroImageOptions);

      // Observe all section titles
      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => observer.observe(title));

      // Observe hero image with special observer
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) heroImageObserver.observe(heroImage);

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

      return { observer, heroImageObserver };
    };

    // Initialize all animations after a brief delay
    const timer = setTimeout(() => {
      animateNavbar();
      animateHero();
      const observers = createScrollObserver();

      // Store for cleanup
      window.__scrollObserver = observers.observer;
      window.__heroImageObserver = observers.heroImageObserver;
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (window.__scrollObserver) {
        window.__scrollObserver.disconnect();
      }
      if (window.__heroImageObserver) {
        window.__heroImageObserver.disconnect();
      }
    };
  }, []);
};

export default useScrollAnimation;