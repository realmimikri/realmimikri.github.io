function showToast(message, { type = 'success', duration = 3000, closable = false } = {}) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('aria-role', 'alert');

  container.appendChild(toast);

  if(closable) {
    const closer = document.createElement('div');
    
    closer.className = 'toast__closer';
    closer.innerHTML = '<span></span><span></span>';
    closer.setAttribute('aria-label', 'Close Popup');
    
    closer.addEventListener('click', () => {
      toast.classList.add('toast--hidden');
      setTimeout(() => {
        container.removeChild(toast);
      }, 300);
    });
    
    toast.appendChild(closer);
  } else {
    setTimeout(() => {
      toast.classList.add('toast--hidden');
      setTimeout(() => container.removeChild(toast), 300);
    }, duration);
  }
}