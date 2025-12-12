// Special handler for hero image to animate when scrolling 7px below `.hero-sub-right-fixed`
const handleHeroImageScroll = () => {
  const heroImage = document.querySelector('.hero-image');
  const navSubRightFixed = document.querySelector('.nav-sub-right-fixed');
  if (!heroImage || !navSubRightFixed) return null;

  const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -7px 0px', 
    // Bottom margin -7px → triggers when the viewport is 7px *below* the element
  };

  const heroImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroImage.classList.add('animate');
        heroImageObserver.disconnect();
      }
    });
  }, observerOptions);

  heroImageObserver.observe(navSubRightFixed);

  return heroImageObserver;
};
