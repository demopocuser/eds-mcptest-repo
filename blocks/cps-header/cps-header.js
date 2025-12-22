export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper';
  
  // Move all children into the wrapper
  while (block.firstChild) {
    headerWrapper.appendChild(block.firstChild);
  }
  
  block.appendChild(headerWrapper);
  
  // Add classes to specific elements
  const logo = block.querySelector('img');
  if (logo && logo.closest('a')) {
    logo.closest('a').parentElement.classList.add('logo');
  }
  
  // Utility nav container
  const utilityNav = document.createElement('div');
  utilityNav.className = 'utility-nav';
  
  // Find and organize utility items
  const links = Array.from(block.querySelectorAll('a'));
  links.forEach((link) => {
    if (link.textContent.includes('Español')) {
      const langDiv = document.createElement('div');
      langDiv.className = 'language-switcher';
      langDiv.appendChild(link);
      utilityNav.appendChild(langDiv);
    } else if (link.textContent.includes('Contact')) {
      const contactDiv = document.createElement('div');
      contactDiv.className = 'contact-link';
      contactDiv.appendChild(link);
      utilityNav.appendChild(contactDiv);
    } else if (link.textContent.includes('Account')) {
      const accountDiv = document.createElement('div');
      accountDiv.className = 'account-login';
      accountDiv.appendChild(link);
      utilityNav.appendChild(accountDiv);
    }
  });
  
  if (utilityNav.children.length > 0) {
    headerWrapper.appendChild(utilityNav);
  }
}
