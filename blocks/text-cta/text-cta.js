/**
 * Decorates the text-cta block
 * @param {Element} block the block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'text-cta-content';
  
  // Extract elements from rows
  rows.forEach((row, index) => {
    const cell = row.firstElementChild;
    
    if (index === 0) {
      // First row is the heading
      const heading = document.createElement('h2');
      heading.textContent = cell.textContent.trim();
      content.append(heading);
    } else if (row.querySelector('a')) {
      // Row with link becomes CTA button
      const link = row.querySelector('a');
      const ctaLink = document.createElement('a');
      ctaLink.href = link.href;
      ctaLink.className = 'text-cta-button';
      ctaLink.textContent = link.textContent.trim();
      content.append(ctaLink);
    } else {
      // Other rows are body text
      const paragraph = document.createElement('p');
      paragraph.textContent = cell.textContent.trim();
      content.append(paragraph);
    }
  });
  
  block.replaceChildren(content);
}
