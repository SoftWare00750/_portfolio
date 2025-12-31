import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    console.log('🔵 useScrollAnimation effect started');
    
    // Animate navbar on page load
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('animate');
      }
    };

    // Animate hero TEXT elements on page load (NOT the image)
    const animateHeroText = () => {
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
      // Standard observer options for most elements
      const standardObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      };

      const standardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log(`Element: ${entry.target.className}, isIntersecting: ${entry.isIntersecting}`);
          
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            console.log('✅ Animated:', entry.target.className);
            
            // Once animated, stop observing to prevent re-triggering
            standardObserver.unobserve(entry.target);

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
      }, standardObserverOptions);

      // SPECIAL observer options ONLY for hero-image
      const heroImageObserverOptions = {
        threshold: 0.3, // 30% of image must be visible
        rootMargin: '0px 0px -200px 0px', // Must scroll 200px past bottom of viewport
      };

      const heroImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log(`Hero Image: isIntersecting: ${entry.isIntersecting}`);
          
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            console.log('✅ Hero image animated with slide-down!');
            // Stop observing after animation
            heroImageObserver.unobserve(entry.target);
          }
        });
      }, heroImageObserverOptions);

      // Observe all section titles with standard observer
      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => standardObserver.observe(title));

      // Observe specific sections with standard observer
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) standardObserver.observe(projectsGrid);

      const aboutGrid = document.querySelector('.about-grid');
      if (aboutGrid) standardObserver.observe(aboutGrid);

      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) standardObserver.observe(skillsGrid);

      const contactContainer = document.querySelector('.contact-container');
      if (contactContainer) standardObserver.observe(contactContainer);

      const footer = document.querySelector('.footer');
      if (footer) standardObserver.observe(footer);

      // CRITICAL: Observe hero-image with its SPECIAL observer
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        console.log('🖼️ Hero image found, setting up SPECIAL observer for slide-down animation');
        console.log('Image position:', {
          top: heroImage.offsetTop,
          height: heroImage.offsetHeight,
          computedDisplay: window.getComputedStyle(heroImage).display,
          computedTransform: window.getComputedStyle(heroImage).transform
        });
        heroImageObserver.observe(heroImage); // Use special observer
      } else {
        console.error('❌ Hero image not found!');
      }

      return { standardObserver, heroImageObserver };
    };

    // Initialize animations after DOM is ready
    const timer = setTimeout(() => {
      animateNavbar();
      animateHeroText(); // Only text, not image
      createScrollObserver(); // This will handle hero-image when scrolled to
    }, 100);

    // Cleanup function
    return () => {
      console.log('🔴 Cleanup running');
      clearTimeout(timer);
    };
  }, []); // Empty dependency array - only run once
};

export default useScrollAnimation;