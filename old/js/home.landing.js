function heroLandingAnimation() {
  gsap.to(hero,
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'back.out'
  });
}

if(window.gsap) heroLandingAnimation();
else window.addEventListener('DOMContentLoaded', heroLandingAnimation);