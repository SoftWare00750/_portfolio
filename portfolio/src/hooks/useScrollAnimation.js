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
            // Skip hero-image - it has its own scroll handler
            if (entry.target.classList.contains('hero-image')) {
              return;
            }
            
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

    // Special scroll handler for hero-image
    let hasAnimated = false;
    
    const handleHeroImageScroll = () => {
      if (hasAnimated) return;

      const heroImage = document.querySelector('.hero-image');
      if (!heroImage) return;

      const scrollY = window.pageYOffset || window.scrollY;
      
      // Trigger after just 2px of scrolling down
      if (scrollY > 2) {
        console.log('ANIMATING HERO IMAGE at scrollY:', scrollY);
        heroImage.classList.add('animate');
        hasAnimated = true;
        // Remove listener after animating since we don't need it anymore
        window.removeEventListener('scroll', handleHeroImageScroll);
      }
    };

    // Initialize all animations after a brief delay
    const timer = setTimeout(() => {
      animateNavbar();
      animateHero();
      const observer = createScrollObserver();

      // Add scroll listener for hero image
      window.addEventListener('scroll', handleHeroImageScroll, { passive: true });
      console.log('Hero image scroll listener attached');
      
      // Check immediately in case already scrolled
      handleHeroImageScroll();

      // Store for cleanup
      window.__scrollObserver = observer;
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (window.__scrollObserver) {
        window.__scrollObserver.disconnect();
      }
      window.removeEventListener('scroll', handleHeroImageScroll);
      console.log('Cleanup: scroll listener removed');
    };
  }, []);
};

export default useScrollAnimation;