export default function decorate(block) {
  // Wrap content in nav element
  const nav = document.createElement('nav');
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');
  
  while (block.firstChild) {
    nav.appendChild(block.firstChild);
  }
  
  block.appendChild(nav);
}
