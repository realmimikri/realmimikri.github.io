function showToast(message, { type = 'success', duration = 3000, closable = false } = {}) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  if(closable) {
    const closer = document.createElement('div');
    
    closer.className = 'toast__closer';
    closer.innerHTML = '<span></span><span></span>';
    
    closer.addEventListener('click', () => {
      toast.classList.add('toast--hidden');
      setTimeout(() => {
        container.removeChild(toast);
        container.removeChild(closer);
      }, 300);
    });
    
    container.appendChild(closer);
  } else {
    setTimeout(() => {
      toast.classList.add('toast--hidden');
      setTimeout(() => container.removeChild(toast), 300);
    }, duration);
  }
}