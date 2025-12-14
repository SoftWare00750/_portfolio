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

    // Special scroll handler for hero-image - MOVED INSIDE useEffect
    let hasAnimated = false;
    
    const handleHeroImageScroll = () => {
      if (hasAnimated) {
        console.log('Already animated, skipping');
        return;
      }

      const heroImage = document.querySelector('.hero-image');
      if (!heroImage) {
        console.log('Hero image not found');
        return;
      }

      // Get the actual position of the hero image on the page
      const imageRect = heroImage.getBoundingClientRect();
      const imageTopRelativeToViewport = imageRect.top;
      const scrollY = window.pageYOffset;
      
      // Log every scroll event for debugging
      console.log('📜 Scroll event - imageTop:', imageTopRelativeToViewport, 'scrollY:', scrollY);
      
      // Animate ONLY when imageTopRelativeToViewport is 400px or less AND scrolled
      if (imageTopRelativeToViewport <= 400 && scrollY > 0) {
        console.log('✅ TRIGGERING ANIMATION! imageTop:', imageTopRelativeToViewport);
        heroImage.classList.add('animate');
        
        // Debug: Check if class was added and what the computed style is
        console.log('Classes after adding animate:', heroImage.className);
        console.log('Computed opacity:', window.getComputedStyle(heroImage).opacity);
        console.log('Computed transform:', window.getComputedStyle(heroImage).transform);
        
        hasAnimated = true;
        window.removeEventListener('scroll', handleHeroImageScroll);
        console.log('✅ Animation complete, listener removed');
      }
    };

    // Initialize all animations after a brief delay
    const timer = setTimeout(() => {
      animateNavbar();
      animateHero();
      createScrollObserver(); // Just call it, don't store it

      // Add scroll listener for hero image
      window.addEventListener('scroll', handleHeroImageScroll, { passive: true });
      console.log('✅ Hero image scroll listener attached');

    }, 100);

    // Cleanup function
    return () => {
      console.log('🔴 Cleanup running');
      clearTimeout(timer);
      window.removeEventListener('scroll', handleHeroImageScroll);
      console.log('🔴 Scroll listener removed in cleanup');
    };
  }, []); // Empty dependency array - only run once
};

export default useScrollAnimation;