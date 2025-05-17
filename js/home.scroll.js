const smoothScroll = {
  container: document.querySelector('.layout__main'),
  sections: null,
  activeSectionIndex: 0,
  isSmoothScrolling: false,
  initials: {}
}

smoothScroll.initials.pgHeight = window.visualViewport ? window.visualViewport.height : (window.outerHeight || window.innerHeight);
smoothScroll.initials.vpBot = window.scrollY + smoothScroll.initials.pgHeight;
smoothScroll.initials.isAtBottom = smoothScroll.initials.vpBot > document.documentElement.scrollHeight - 1;

smoothScroll.sections = Array.from(smoothScroll.container.children);
smoothScroll.sections.push(document.querySelector('.layout__footer'));

smoothScroll.sections.forEach((section) => {
  gsap.set(section, { opacity: 0 });
});

for(let index = 0; index < smoothScroll.sections.length; index++) {
  const section = smoothScroll.sections[index];
  const top = section.offsetTop;
  const bot = top + section.offsetHeight;
  
  if(bot >= window.scrollY && top + 10 <= smoothScroll.initials.vpBot) {
    gsap.set(section, { opacity: 1 });
    smoothScroll.activeSectionIndex = index;
    window.scrollTo(0, top);
  }
}

if(smoothScroll.initials.isAtBottom) {
  gsap.set(smoothScroll.sections[smoothScroll.sections.length - 1], { opacity: 1 });
}

smoothScroll.scrollToSection = function(index) {
  if(index < 0 || index >= smoothScroll.sections.length)
    return;
  
  const prevElement = smoothScroll.sections[smoothScroll.activeSectionIndex];
  const element = smoothScroll.sections[index];
  
  smoothScroll.isSmoothScrolling = true;
  smoothScroll.activeSectionIndex = index;
  
  document.documentElement.style.overflowY = 'hidden';
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: element
    },
    ease: 'power2.out',
    onComplete: () => {
      document.documentElement.style.overflowY = '';
      smoothScroll.isSmoothScrolling = false;
      
      const rect = (prevElement.localName === 'footer' ? prevElement : prevElement.children[0]).getBoundingClientRect();
      if(rect.top > 0 && rect.bottom < window.innerHeight)
        return;
      
      gsap.to(prevElement, {
        opacity: 0,
        duration: 0.25,
        ease: 'power1.in'
      });
    }
  });
  
  gsap.set(element, { y: 10 });
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power1.in'
  });
}

smoothScroll.scrollFunction = function(delta) {
  let elementRect = smoothScroll.sections[smoothScroll.activeSectionIndex].getBoundingClientRect();
  if(elementRect.top < 50 && elementRect.bottom > window.innerHeight - 20) {
    document.documentElement.style.overflowY = 'hidden';
    setTimeout(() => document.documentElement.style.overflowY = '', 500);
    return;
  }
  
  if(delta < 0 && smoothScroll.activeSectionIndex < smoothScroll.sections.length - 1)
    smoothScroll.scrollToSection(smoothScroll.activeSectionIndex + 1);
  else if(delta > 0 && smoothScroll.activeSectionIndex > 0)
    smoothScroll.scrollToSection(smoothScroll.activeSectionIndex - 1);
}

smoothScroll.mouseFunction = function(ev) {
  if(smoothScroll.isSmoothScrolling)
    return;
  
  const elementRect = smoothScroll.sections[smoothScroll.activeSectionIndex].getBoundingClientRect();
  
  smoothScroll.scrollFunction(ev.deltaY, ev);
}

smoothScroll.touchFunction = function() {
  let startY = 0;
  let fingerIndex = -1;
  let element = null;
  
  document.documentElement.addEventListener('touchstart', (ev) => {
    fingerIndex = fingerIndex === -1 ? ev.changedTouches.length - 1 : fingerIndex;
    startY = ev.touches[fingerIndex].clientY;
  }, { passive: true });
  
  document.documentElement.addEventListener('touchend', (ev) => {
    const touch = ev.changedTouches[fingerIndex]
      || ev.changedTouches[ev.changedTouches.length - 1]
      || ev.touches[ev.touches.length - 1];    const endY = touch.clientY;
    const delta = endY - startY;
    
    if(Math.abs(delta) > 10 && !smoothScroll.isSmoothScrolling) {
      smoothScroll.scrollFunction(delta);
    }
    
    fingerIndex = -1;
  }, { passive: true });
}

if(document.documentElement) {
  smoothScroll.container.addEventListener('wheel', smoothScroll.mouseFunction, { passive: true });
  smoothScroll.touchFunction();
} else {
  window.addEventListener('DOMContentLoaded', () => {
    smoothScroll.container.addEventListener('wheel', smoothScroll.mouseFunction, { passive: true });
    smoothScroll.touchFunction();
  })
}

window.addEventListener('resize', () => {
  window.scrollTo(0, smoothScroll.sections[smoothScroll.activeSectionIndex].offsetTop);
});