function toggleNavVisibility() {
  const nav = document.getElementById('header-nav');
  const isActive = nav.getBoundingClientRect().bottom > 0;
  
  document.body.style.overflowY = isActive ? 'initial' : 'hidden';
  
  gsap.set(nav, { zIndex: 0, opacity: 1 - Number(!isActive) });
  gsap.to(nav, {
    top: isActive ? '-100vh' : '4rem',
    zIndex: 10,
    duration: 1,
    ease: 'power3.inOut'
  });
  gsap.to(nav, {
    opacity: 1 - Number(isActive),
    duration: 0.5,
    ease: isActive ? 'power4.inOut' : 'power4.out'
  });
}

document.getElementById('menu-toggle').addEventListener('click', toggleNavVisibility);