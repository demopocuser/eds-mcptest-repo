/**
 * Decorates the features block
 * @param {Element} block the block element
 */
export default function decorate(block) {
  // Convert table rows to feature cards
  const ul = document.createElement('ul');
  ul.className = 'features-list';
  
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'features-item';
    
    // Extract heading and description from cells
    const cells = [...row.children];
    
    if (cells.length >= 2) {
      const heading = document.createElement('h3');
      heading.textContent = cells[0].textContent.trim();
      
      const description = document.createElement('p');
      description.textContent = cells[1].textContent.trim();
      
      li.append(heading, description);
    } else if (cells.length === 1) {
      // Single cell - extract heading from strong/bold text
      const cellContent = cells[0];
      const strongElement = cellContent.querySelector('strong, b');
      
      if (strongElement) {
        const heading = document.createElement('h3');
        heading.textContent = strongElement.textContent.trim();
        
        // Rest of content is description
        const description = document.createElement('p');
        description.textContent = cellContent.textContent.replace(strongElement.textContent, '').trim();
        
        li.append(heading, description);
      } else {
        // Use first line as heading, rest as description
        const text = cellContent.textContent.trim();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length > 0) {
          const heading = document.createElement('h3');
          heading.textContent = lines[0];
          
          if (lines.length > 1) {
            const description = document.createElement('p');
            description.textContent = lines.slice(1).join(' ');
            li.append(heading, description);
          } else {
            li.append(heading);
          }
        }
      }
    }
    
    ul.append(li);
  });
  
  block.replaceChildren(ul);
}
