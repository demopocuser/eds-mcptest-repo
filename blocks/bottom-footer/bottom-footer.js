export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-wrapper';
  
  // Organize content into sections
  const copyright = document.createElement('div');
  copyright.className = 'copyright';
  
  const footerLinks = document.createElement('div');
  footerLinks.className = 'footer-links';
  
  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  
  Array.from(block.children).forEach((child) => {
    const text = child.textContent.toLowerCase();
    
    if (text.includes('©') || text.includes('copyright')) {
      copyright.appendChild(child.cloneNode(true));
    } else if (child.querySelector('img')) {
      // Social media icons
      socialLinks.appendChild(child.cloneNode(true));
    } else {
      // Footer links
      footerLinks.appendChild(child.cloneNode(true));
    }
  });
  
  wrapper.appendChild(copyright);
  wrapper.appendChild(footerLinks);
  wrapper.appendChild(socialLinks);
  
  block.innerHTML = '';
  block.appendChild(wrapper);
}
