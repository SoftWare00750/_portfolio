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
    const createHeroImageScrollHandler = () => {
      const heroImage = document.querySelector('.hero-image');
      
      if (!heroImage) {
        console.log('Hero image not found!');
        return null;
      }

      console.log('Hero image found, setting up scroll handler');
      let hasAnimated = false;

      const checkScroll = () => {
        if (hasAnimated) return;

        // Get current scroll position from top of page
        const scrollY = window.pageYOffset || window.scrollY;
        
        // Get viewport height
        const viewportHeight = window.innerHeight;
        
        // Trigger when user scrolls down 60% of one viewport height
        const triggerPoint = viewportHeight * 0.6;
        
        console.log('Scroll check:', {
          scrollY: scrollY,
          viewportHeight: viewportHeight,
          triggerPoint: triggerPoint,
          shouldTrigger: scrollY > triggerPoint
        });
        
        if (scrollY > triggerPoint) {
          console.log('ANIMATING HERO IMAGE NOW!');
          heroImage.classList.add('animate');
          hasAnimated = true;
          window.removeEventListener('scroll', checkScroll);
        }
      };

      window.addEventListener('scroll', checkScroll);
      console.log('Scroll listener added');
      // Check immediately in case already scrolled
      checkScroll();

      return checkScroll;
    };

    // Initialize all animations after a brief delay
    const timer = setTimeout(() => {
      animateNavbar();
      animateHero();
      const observer = createScrollObserver();
      const heroImageScrollHandler = createHeroImageScrollHandler();

      // Store for cleanup - store the handler reference correctly
      window.__scrollObserver = observer;
      window.__heroImageScrollHandlerRef = heroImageScrollHandler;
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (window.__scrollObserver) {
        window.__scrollObserver.disconnect();
      }
      if (window.__heroImageScrollHandlerRef) {
        window.removeEventListener('scroll', window.__heroImageScrollHandlerRef);
      }
    };
  }, []);
};

export default useScrollAnimation;