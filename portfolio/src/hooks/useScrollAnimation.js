import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Animate navbar on page load
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        setTimeout(() => {
          navbar.classList.add('animate');
        }, 100);
      }
    };

    // Animate hero section on page load
    const animateHero = () => {
      const heroName = document.querySelector('.hero-name');
      const heroSubFixed = document.querySelector('.hero-sub-right-fixed');
      const heroSub2 = document.querySelector('.hero-sub-right2');
      const heroImage = document.querySelector('.hero-image');

      if (heroName) {
        setTimeout(() => heroName.classList.add('animate'), 300);
      }
      if (heroSubFixed) {
        setTimeout(() => heroSubFixed.classList.add('animate'), 500);
      }
      if (heroSub2) {
        setTimeout(() => heroSub2.classList.add('animate'), 500);
      }
      if (heroImage) {
        setTimeout(() => heroImage.classList.add('animate'), 700);
      }
    };

    // Observer for scroll-triggered animations
    const createScrollObserver = () => {
      const observerOptions = {
        threshold: 0,
        rootMargin: '5px 0px -5px 0px' // Trigger 5px before element comes into view
      };

      const elementObserverOptions = {
        threshold: 0,
        rootMargin: '2px 0px -2px 0px' // Trigger 2px before element comes into view
      };

      // Observer for sections (5px offset)
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, observerOptions);

      // Observer for elements within sections (2px offset)
      const elementObserver = new IntersectionObserver((entries) => {
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
      }, elementObserverOptions);

      // Observe all section titles with section observer
      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => sectionObserver.observe(title));

      // Observe content grids with element observer
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) elementObserver.observe(projectsGrid);

      const aboutGrid = document.querySelector('.about-grid');
      if (aboutGrid) elementObserver.observe(aboutGrid);

      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) elementObserver.observe(skillsGrid);

      const contactContainer = document.querySelector('.contact-container');
      if (contactContainer) elementObserver.observe(contactContainer);

      const footer = document.querySelector('.footer');
      if (footer) elementObserver.observe(footer);

      return { sectionObserver, elementObserver };
    };

    // Initialize all animations
    animateNavbar();
    animateHero();
    const observers = createScrollObserver();

    // Cleanup
    return () => {
      if (observers) {
        observers.sectionObserver.disconnect();
        observers.elementObserver.disconnect();
      }
    };
  }, []);
};

export default useScrollAnimation;