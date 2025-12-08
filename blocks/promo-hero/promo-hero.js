/**
 * Decorates the promo hero block
 * @param {Element} block the block element
 */
export default function decorate(block) {
  // Extract content from the table structure
  const rows = [...block.children];
  
  // Create the semantic structure
  const heading = document.createElement('h1');
  const subheading = document.createElement('h2');
  const description = document.createElement('p');
  const form = document.createElement('form');
  
  // Extract content from rows
  if (rows[0]) {
    heading.textContent = rows[0].textContent.trim();
  }
  
  if (rows[1]) {
    subheading.textContent = rows[1].textContent.trim();
  }
  
  if (rows[2]) {
    description.textContent = rows[2].textContent.trim();
  }
  
  // Create the ZIP code form
  form.className = 'promo-hero-form';
  form.setAttribute('action', '#');
  form.setAttribute('method', 'get');
  
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'promo-hero-input-wrapper';
  
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'zipcode');
  input.setAttribute('placeholder', 'Enter your zip code');
  input.setAttribute('aria-label', 'Enter your zip code');
  input.className = 'promo-hero-input';
  
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.className = 'promo-hero-button';
  
  // Extract button text and URL from the link in row 4
  if (rows[3]) {
    const link = rows[3].querySelector('a');
    if (link) {
      button.textContent = link.textContent.trim();
      form.setAttribute('action', link.getAttribute('href'));
    }
  }
  
  inputWrapper.append(input, button);
  form.append(inputWrapper);
  
  // Create content wrapper
  const content = document.createElement('div');
  content.className = 'promo-hero-content';
  content.append(heading, subheading, description, form);
  
  // Replace block content
  block.replaceChildren(content);
}
