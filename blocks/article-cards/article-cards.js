import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the article-cards block
 * @param {Element} block the block element
 */
export default function decorate(block) {
  // Create section heading if present in first row
  let sectionHeading = null;
  let sectionDescription = null;
  
  const firstRow = block.firstElementChild;
  if (firstRow && firstRow.children.length === 1) {
    const firstCell = firstRow.firstElementChild;
    // Check if it's a heading (no image)
    if (!firstCell.querySelector('picture')) {
      sectionHeading = document.createElement('h2');
      sectionHeading.className = 'article-cards-heading';
      sectionHeading.textContent = firstCell.textContent.trim();
      firstRow.remove();
      
      // Check if second row is description
      const secondRow = block.firstElementChild;
      if (secondRow && secondRow.children.length === 1 && !secondRow.querySelector('picture')) {
        sectionDescription = document.createElement('p');
        sectionDescription.className = 'article-cards-description';
        sectionDescription.textContent = secondRow.firstElementChild.textContent.trim();
        secondRow.remove();
      }
    }
  }
  
  // Convert remaining rows to article cards
  const ul = document.createElement('ul');
  ul.className = 'article-cards-list';
  
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'article-card';
    
    const cells = [...row.children];
    
    // Handle image if present
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture.querySelector('img');
      if (img) {
        const figure = document.createElement('figure');
        figure.className = 'article-card-image';
        figure.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]));
        li.append(figure);
      }
    }
    
    // Handle content cells
    const contentDiv = document.createElement('div');
    contentDiv.className = 'article-card-content';
    
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) return; // Skip image cell
      
      const link = cell.querySelector('a');
      if (link) {
        // If cell has a link, it's likely the title or CTA
        const hasReadMore = link.textContent.toLowerCase().includes('read more');
        
        if (hasReadMore) {
          // Create read more link
          const readMoreLink = document.createElement('a');
          readMoreLink.href = link.href;
          readMoreLink.className = 'article-card-link';
          readMoreLink.textContent = 'Read more';
          contentDiv.append(readMoreLink);
        } else {
          // Title with link
          const title = document.createElement('h3');
          const titleLink = document.createElement('a');
          titleLink.href = link.href;
          titleLink.textContent = link.textContent.trim();
          title.append(titleLink);
          contentDiv.append(title);
        }
      } else {
        // Plain text - could be title or description
        const text = cell.textContent.trim();
        if (text) {
          // If it's short (< 100 chars), likely a title
          if (text.length < 100 && !contentDiv.querySelector('h3')) {
            const title = document.createElement('h3');
            title.textContent = text;
            contentDiv.append(title);
          } else {
            // Description
            const description = document.createElement('p');
            description.textContent = text;
            contentDiv.append(description);
          }
        }
      }
    });
    
    li.append(contentDiv);
    ul.append(li);
  });
  
  // Assemble the block
  const container = document.createElement('div');
  container.className = 'article-cards-container';
  
  if (sectionHeading) {
    container.append(sectionHeading);
  }
  
  if (sectionDescription) {
    container.append(sectionDescription);
  }
  
  container.append(ul);
  
  // Check if there's a "View More" link at the end
  const lastCard = ul.lastElementChild;
  if (lastCard && lastCard.textContent.toLowerCase().includes('view more')) {
    lastCard.remove();
    const viewMoreLink = lastCard.querySelector('a');
    if (viewMoreLink) {
      const viewMore = document.createElement('a');
      viewMore.href = viewMoreLink.href;
      viewMore.className = 'article-cards-view-more';
      viewMore.textContent = viewMoreLink.textContent.trim();
      container.append(viewMore);
    }
  }
  
  block.replaceChildren(container);
}
