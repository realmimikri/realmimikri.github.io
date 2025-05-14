function toggleNavVisibility() {
  const nav = document.getElementById('nav-menu');
  const isActive = nav.getBoundingClientRect().bottom > 0;
  
  document.body.style.overflowY = isActive ? 'initial' : 'hidden';
  
  gsap.to(nav, {
    top: isActive ? '-100vh' : '4rem',
    duration: 1,
    ease: 'power3.inOut'
  })
}

document.getElementById('nav-toggle').addEventListener('click', toggleNavVisibility);