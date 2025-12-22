export default function decorate(block) {
  // Find heading
  const heading = block.querySelector('h2, h1');
  if (heading) {
    heading.tagName = 'h2';
  }
  
  // Find hero image (first image)
  const firstImg = block.querySelector('img');
  if (firstImg) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image';
    firstImg.parentNode.insertBefore(imgWrapper, firstImg);
    imgWrapper.appendChild(firstImg);
  }
  
  // Create icon grid
  const links = Array.from(block.querySelectorAll('a'));
  if (links.length > 1) {
    const iconGrid = document.createElement('div');
    iconGrid.className = 'icon-grid';
    
    links.forEach((link) => {
      // Skip if it's not a benefit link
      if (link === firstImg?.closest('a')) return;
      
      const card = document.createElement('div');
      card.className = 'benefit-card';
      
      // Wrap link content
      const linkText = link.textContent.trim();
      link.innerHTML = '';
      
      // If link has an image, keep it
      const linkImg = link.querySelector('img');
      if (linkImg) {
        link.appendChild(linkImg);
      }
      
      // Add text as span
      const textSpan = document.createElement('span');
      textSpan.textContent = linkText;
      link.appendChild(textSpan);
      
      card.appendChild(link);
      iconGrid.appendChild(card);
    });
    
    block.appendChild(iconGrid);
  }
}
