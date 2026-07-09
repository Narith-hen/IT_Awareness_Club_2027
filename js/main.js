/* Global behavior — loaded on every page
   Handles: preloader, mobile menu, navbar shrink, back-to-top, footer year */

// Preloader (with 2.5s safety timeout)
const preloader = document.querySelector('.preloader');
const hidePreloader = () => preloader && preloader.classList.add('hidden');
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 2500);

// Mobile menu toggle
const toggle = document.querySelector('.navbar__toggle');
const links = document.querySelector('.navbar__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close after tapping a link
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Navbar shrink on scroll + back-to-top visibility
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Auto footer year
const yearEl = document.querySelector('#footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
