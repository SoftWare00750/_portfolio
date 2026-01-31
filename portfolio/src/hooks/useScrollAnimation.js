import { useEffect } from 'react';

export const useScrollAnimation = (loading) => {
  useEffect(() => {
    // Don't run anything while the loading screen is still showing
    if (loading) return;

    console.log('🔵 useScrollAnimation effect started');
    
    const animateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('animate');
      }
    };

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

    const createScrollObserver = () => {
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
            standardObserver.unobserve(entry.target);

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

      const heroImageObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -200px 0px',
      };

      const heroImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log(`Hero Image: isIntersecting: ${entry.isIntersecting}`);
          
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            console.log('✅ Hero image animated with slide-down!');
            heroImageObserver.unobserve(entry.target);
          }
        });
      }, heroImageObserverOptions);

      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => standardObserver.observe(title));

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

      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        console.log('🖼️ Hero image found, setting up SPECIAL observer for slide-down animation');
        heroImageObserver.observe(heroImage);
      } else {
        console.error('❌ Hero image not found!');
      }

      return { standardObserver, heroImageObserver };
    };

    // Now safe to run — loading is false, DOM is visible and stable
    const timer = setTimeout(() => {
      animateNavbar();
      animateHeroText();
      createScrollObserver();
    }, 100);

    return () => {
      console.log('🔴 Cleanup running');
      clearTimeout(timer);
    };
  }, [loading]); // Re-run when loading changes from true → false
};

export default useScrollAnimation;