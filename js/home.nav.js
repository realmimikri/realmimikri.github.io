function initNavGSAPAnimation() {
  gsap.set('.nav', { opacity: 0, y: '-100vh' });
  setTimeout(() => {
    gsap.to('.nav',
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top+=10%',
        scrub: true
      }
    });
  }, 200);
}

initNavGSAPAnimation();
