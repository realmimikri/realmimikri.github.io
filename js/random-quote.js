(function() {
  const $ = (query) => document.querySelector(query);
        $.all = (query) => document.querySelectorAll(query);
        $.id = (id) => document.getElementById(id);
  
  const button  = $.id('quote-generate');
  const spinner = $.id('quote-spinner');
  const list    = $.id('quote-list');
  const delay = new Promise((resolve) => setTimeout(resolve, 300));
  
  let cache = [];
  let cacheIndex = 0;
  let generateCount = 0;
  let throttle = false;
  
  button.addEventListener('click', () => {
    if(throttle) return;
    throttle = true;
    
    if(list.replaceChildren) list.replaceChildren();
    else {
      for(let j = list.childNodes.length - 1; j >= 0; --j) {
        list.removeChild(list.childNodes[j]);
      }
    }
    
    button.disabled = true;
    spinner.classList.remove('hidden');
    
    Promise.all([delay, getQuote()])
    .then((data) => {
      const fragment = document.createDocumentFragment();
      
      data.forEach((quote) => {
        const li = document.createElement('li');
        li.textContent = `${quote.q} — ${quote.a}`;
        fragment.append(li);
      });
      
      button.disabled = false;
      spinner.classList.add('hidden');
      
      list.appendChild(fragment);
      
      throttle = false;
    })
    .catch(console.error);
  });
  
  async function getQuote() {
    if(generateCount === 0 || cacheIndex === 50) {
      try {
        return await fetchQuote();
      } catch(err) {
        showToast(err.message || err.toString(), { type: 'error', closable: true });
        throw err;
      }
    }
    else return retrieveCachedQuote();
  }
  
  async function fetchQuote() {
    const res  = await fetch('/api/random-quote', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json'
      }
    });
    const data = await res.json();
    
    cache = data;
    cacheIndex = 0;
    generateCount += 50;
    
    return data;
  }
  
  function retrieveCachedQuote() {
    const data = [
      cache[cacheIndex+0],
      cache[cacheIndex+1],
      cache[cacheIndex+2],
      cache[cacheIndex+3],
      cache[cacheIndex+4]
    ];
    
    cacheIndex += 5;
    return data;
  }
})();