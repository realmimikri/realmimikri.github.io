

/*

const vnMono = (function({ $, clearTextNodes, typewriter, typewriter_reverseGroup, reverseTypeEffect }) {
  const timeline = gsap.timeline();   // Global Timeline
  
  //////////////////////////// Scenes
  
  const intro = {
    start: asyncTimeline(tl => tl.to('#mono-1', { opacity: 1, duration: 1, ease: 'power3.in' })),
    end: asyncTimeline(tl => tl.to('#mono-1', { opacity: 0, duration: 1.5, delay: 2, ease: 'power3.out' })),
    autoEnding: true,
    id: 'intro'
  };
  
  const monologue1 = {
    start: asyncTimeline(
      tl => tl
      .timeScale(4)
      .to('#mono-2', { opacity: 1 })
      .add(typewriter('#mono-3', 3, 0, false))
      .add(typewriter('#mono-4', 1, 1, false))
      .add(typewriter('#mono-5', 0.4, 0, true, 0.4, 2))
      .add(typewriter('#mono-6', 4, 3, false))
    ),
    end: asyncTimeline(tl => tl.add(typewriter_reverseGroup(['#mono-6', '#mono-4', '#mono-3'], 3, 2))),
    autoEnding: false,
    id: 'mono-1'
  };
  
  const monologue2 = {
    start: asyncTimeline(
      tl => tl
      .to('#mono-7', { opacity: 1 })
      .add(typewriter('#mono-8', 3, 0, false))
      .add(typewriter('#mono-9', 0.4, 1, false))
      .add(typewriter('#mono-10', 2, 2, false))
    ),
    end: asyncTimeline(tl => tl.add(typewriter_reverseGroup(['#mono-8', '#mono-9', '#mono-10'], 3, 2))),
    autoEnding: false,
    id: 'mono-2'
  };
  //////////////////////////// Async Utility
  
  function asyncTimeline(callback) {
    const tl = callback(gsap.timeline({ paused: true }));
    const _originalOnComplete = tl.eventCallback('onComplete');
    
    return () => new Promise((resolve) => {
      tl.eventCallback('onComplete', () => {
        if(typeof _originalOnComplete === 'function') _originalOnComplete();
        resolve();
      });
      
      tl.restart();
    });
  }
  
  function asyncTween(gsapFunc, target, var1, var2) {
    const var3 = var2 || var1;
    const _originalOnComplete = var3.onComplete;
    const tween = gsapFunc(target, var1, var2);
    tween.pause();
    
    return () => new Promise((resolve) => {
      var3.onComplete = () => {
        if(typeof _originalOnComplete === 'function') _originalOnComplete();
        resolve();
      }
      
      tween.play();
    });
  }
  
  //////////////////////////// Scene Manager
  const scenes   = [intro, monologue1, monologue2];
  let sceneIndex = 0;
  let prev       = null;
  let current    = scenes[0];
  
  const getNextScene = () => {
    ++sceneIndex;
    if(sceneIndex >= scenes.length) --sceneIndex;
    return scenes[sceneIndex];
  }
  
  async function executeTween() {
    if(prev) await prev.end();
    await current.start();
    
    if(current.autoEnding) {
      prev = current;
      current = getNextScene();
      if(prev === current) await current.end();
      else await executeTween();
    }
  }
  
  function goto(newIndex) {
    if(newIndex === 0 || sceneIndex !== newIndex) {
      sceneIndex = newIndex;
      prev = current;
      current = scenes[sceneIndex];
      return executeTween()
    }
    
    return Promise.resolve();
  }
  
  function next() {
    if(current.isActive()) return;
    //// Prevent skipping while animating
    
    
  }
  
  function previous() {
    
    
    if(stepIndex > 0) {
      stepIndex--;
    } else if(sceneIndex > 0) {
      sceneIndex--;
      stepIndex = scenes[stepIndex].length - 1;
    }
    
  }
  
  function reset() {
    sceneIndex = 0;
    stepIndex = 0;
  }
  
  //////////////////////////// Setting up some things
  
  clearTextNodes($('#mono-2'));
  clearTextNodes($('#mono-7'));
  
  window.atl = asyncTimeline;
  window.atw = asyncTween;
  window.scenes = scenes
  
  return {
    goto, next, previous, reset,
    get state() {
      return { current, prev, sceneIndex }
    }
  }
})((function() {
  const $ = (query, el = document) => el.querySelector(query);
  function clearTextNodes(parent) {
    parent.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.remove();
      }
    });
  };
  
  function typewriter(el, dur, delay, immReverse, reverseDur, reverseDelay) {
    el = $(el);
    const text = el._dataText = el.textContent;
    el.textContent = '';
    
    const tl = gsap.timeline()
    tl.to(el, {
      opacity: 1
    }, 0);
    
    tl.to(el, {
      duration: dur,
      delay,
      text,
      ease: 'none',
      onComplete() {
        if(immReverse) {
          gsap.delayedCall(reverseDelay, () => {
            gsap.to(el, {
              duration: reverseDur,
              text: '',
              ease: 'none'
            });
          });
        }
      }
    }, 0);
    
    return tl;
  }
  
  function typewriter_reverseGroup(elements, dur, delay) {
    elements = elements.map(el => $(el));
    let totalChars = elements.reduce((sum, el) => sum + el._dataText.length, 0);
    
    const tl = gsap.timeline({ delay });
    for(let el of elements) {
      const elDur = (el._dataText.length / totalChars) * dur;
      tl.add(reverseTypeEffect(el, elDur));
    }
    
    return tl;
  }
  
  function reverseTypeEffect(el, dur) {
    const text = el._dataText || el.textContent;
    const chars = text.length;
  
    return gsap.timeline().to({ i: chars }, {
      i: 0,
      duration: dur,
      ease: 'none',
      onUpdate: function () {
        const current = Math.floor(this.targets()[0].i);
        el.textContent = text.slice(0, current);
      }
    });
  }
  
  return { $, clearTextNodes, typewriter, typewriter_reverseGroup, reverseTypeEffect };
})());
*/