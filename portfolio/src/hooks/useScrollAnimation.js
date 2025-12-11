import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Animate navbar on page load with proper timing
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          navbar.classList.add('animate');
        }, 150);
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

    // Observer for scroll-triggered animations
    const createScrollObserver = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
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

      // Observe projects grid
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) observer.observe(projectsGrid);

      // Observe about section
      const aboutGrid = document.querySelector('.about-grid');
      if (aboutGrid) observer.observe(aboutGrid);

      // Observe skills grid
      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) observer.observe(skillsGrid);

      // Observe contact section
      const contactContainer = document.querySelector('.contact-container');
      if (contactContainer) observer.observe(contactContainer);

      // Observe footer
      const footer = document.querySelector('.footer');
      if (footer) observer.observe(footer);

      return observer;
    };

    // Special handler for hero image on scroll
    const handleHeroImageScroll = () => {
      const heroImage = document.querySelector('.hero-image');
      if (!heroImage) return null;

      const scrollHandler = () => {
        if (window.scrollY >= 20 && !heroImage.classList.contains('animate')) {
          heroImage.classList.add('animate');
          window.removeEventListener('scroll', scrollHandler);
        }
      };

      window.addEventListener('scroll', scrollHandler);
      
      // Check immediately in case already scrolled
      if (window.scrollY >= 20) {
        heroImage.classList.add('animate');
      }

      return scrollHandler;
    };

    // Initialize all animations
    animateNavbar();
    animateHero();
    const observer = createScrollObserver();
    const scrollHandler = handleHeroImageScroll();

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, []);
};

export default useScrollAnimation;