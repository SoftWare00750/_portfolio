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
      const heroImage = document.querySelector('.hero-image');

      if (heroName) {
        setTimeout(() => heroName.classList.add('animate'), 400);
      }
      if (heroSubFixed) {
        setTimeout(() => heroSubFixed.classList.add('animate'), 600);
      }
      if (heroSub2) {
        setTimeout(() => heroSub2.classList.add('animate'), 600);
      }
      // ADDED: Immediately add animate class to hero image (no scroll trigger)
      if (heroImage) {
        heroImage.classList.add('animate');
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
    const handleHeroImageScroll = () => {
      const heroImage = document.querySelector('.hero-image');
      const heroSubFixed = document.querySelector('.hero-sub-right-fixed');
      
      if (!heroImage || !heroSubFixed) {
        console.log('Hero image or hero-sub-right-fixed not found');
        return null;
      }

      let hasAnimated = false;

      const checkScroll = () => {
        if (hasAnimated) return;

        // Get the bottom position of hero-sub-right-fixed
        const heroSubFixedRect = heroSubFixed.getBoundingClientRect();
        const heroSubFixedBottom = heroSubFixedRect.bottom;

        // Trigger animation when we've scrolled 10px past the bottom of hero-sub-right-fixed
        // heroSubFixedBottom will be negative when we've scrolled past it
        if (heroSubFixedBottom < -10) {
          console.log('Animating hero image!');
          heroImage.classList.add('animate');
          hasAnimated = true;
          window.removeEventListener('scroll', checkScroll);
        }
      };

      window.addEventListener('scroll', checkScroll);
      // Check immediately in case already scrolled
      checkScroll();

      return checkScroll;
    };

     const timer = setTimeout(() => {
      animateNavbar();
      animateHero();
      const observer = createScrollObserver();
      const heroImageScrollHandler = handleHeroImageScroll();

      // Store for cleanup
      window.__scrollObserver = observer;
      window.__heroImageScrollHandler = heroImageScrollHandler;
    }, 100);
    

    // REMOVED: Hero image scroll handler - no longer needed
    // Hero image now animates immediately on page load

    // Initialize all animations
    animateNavbar();
    animateHero();
    const observer = createScrollObserver();

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
};

export default useScrollAnimation;