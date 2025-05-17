const _upwardEmitter = {
  fragment: null,
  base: document.querySelector('.upward__item'),
  container: document.querySelector('.upward__container'),
  list: Array(0)
};

_upwardEmitter.rgb = null;

_upwardEmitter.animateItem = function(index, durationSecond, durationMultiplier = 1, scaler = 1.5) {
  const item = _upwardEmitter.list[index];
  
  if(_upwardEmitter.rgb)
    // Random color
    item.style[_upwardEmitter.rgb] = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  
  // Random starting position
  item.style.left = `${Math.random() * 100}%`;
  item.style.bottom = '0';
  
  // Random scale and rotation
  const scale = Math.random() * scaler;
  item.style.transform = `scale(${scale}) rotate(${Math.random() * 360}deg)`;
  
  // Animate
  gsap.to(item, {
    y: -window.innerHeight,
    x: (Math.random() - 0.5) * 100,
    opacity: 0,
    duration: durationSecond + Math.random() * durationMultiplier,
    ease: 'power1.out',
    onComplete: () => {
      gsap.set(item, { y: 100, opacity: 1 });
      setTimeout(_upwardEmitter.animateItem, index * 30, index, durationSecond, durationMultiplier, scaler);
    }
  });
}

_upwardEmitter.init = function(len, rgb = null, generatorDelay = 0, generatorInterval = 300, config = { duration: 3, multiplier: 1, scaler: 1.5 }) {
  _upwardEmitter.fragment = document.createDocumentFragment();
  _upwardEmitter.intervals = [];
  _upwardEmitter.rgb = rgb;
  _upwardEmitter.list = Array(len);
  _upwardEmitter.list[0] = _upwardEmitter.base;
  
  for(let i = 1; i < _upwardEmitter.list.length; ++i) {
    const item = _upwardEmitter.base.cloneNode(true);
    _upwardEmitter.list[i] = item;
    _upwardEmitter.fragment.append(item);
  }
  
  _upwardEmitter.container.append(_upwardEmitter.fragment);
  
  setTimeout(() => {
    _upwardEmitter.animateItem(0, config.duration, config.multiplier, config.scaler);
    
    let index = 1;
    const interval = setInterval(() => {
      _upwardEmitter.animateItem(index, config.duration, config.multiplier, config.scaler);
      if(++index === _upwardEmitter.list.length)
        clearInterval(interval);
    }, generatorInterval);
  }, generatorDelay);
}