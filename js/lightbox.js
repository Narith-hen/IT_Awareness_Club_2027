/* Shared lightbox — add class="lightbox-trigger" to any <img> thumbnail */
(function () {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = '<img alt="">';
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector('img');
  let lastFocused = null;

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    lastFocused = document.activeElement;
    lightbox.classList.add('open');
    lightbox.tabIndex = -1;
    lightbox.focus();
  }
  function close() {
    lightbox.classList.remove('open');
    if (lastFocused) lastFocused.focus(); // return focus to trigger
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) open(trigger.dataset.full || trigger.src, trigger.alt);
    else if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
