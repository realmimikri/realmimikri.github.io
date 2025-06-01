(function() {
  const $ = (query) => document.querySelector(query);
        $.all = (query) => document.querySelectorAll(query);
        $.id = (id) => document.getElementById(id);
  
  const button  = $.id('quote-generate');
  const spinner = $.id('quote-spinner');
  const list    = $.id('quote-list');
  const delay = () => new Promise((resolve) => setTimeout(resolve, 300));
  
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
    
    Promise.all([getQuote(), delay()])
    .then(([data]) => {
      const fragment = document.createDocumentFragment();
      
      for(let i = 0, limit = 5; i < limit; i++) {
        const quote = data[i];
        if(!quote) {
          limit++;
          if(limit >= 50) break;
          else continue;
        }
        
        const li = document.createElement('li');
        li.textContent = `${quote.q} — ${quote.a}`;
        fragment.append(li);
      };
      
      cacheIndex += 5;
      
      button.disabled = false;
      spinner.classList.add('hidden');
      
      list.appendChild(fragment);
      
      throttle = false;
    })
    .catch((err) => {
      showToast(err.message || err.toString(), { type: 'error', closable: true });
      console.error(err);
    });
  });
  
  async function getQuote() {
    if(generateCount === 0 || cacheIndex >= 50) return await fetchQuote();
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