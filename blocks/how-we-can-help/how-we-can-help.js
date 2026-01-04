export default function decorate(block) {
  // EDS table format:
  // Row 1: label
  // Row 2: heading
  // Row 3+: paragraphs
  // Last row: image
  const rows = [...block.children];
  
  // Create two-column layout
  const content = document.createElement('div');
  content.className = 'help-content';
  
  const textCol = document.createElement('div');
  textCol.className = 'text-column';
  
  const imageCol = document.createElement('div');
  imageCol.className = 'image-column';
  
  rows.forEach((row, index) => {
    const cell = row.querySelector('div');
    if (!cell) return;
    
    // Check if row contains an image
    const img = cell.querySelector('picture, img');
    
    if (img) {
      // This is the image row
      imageCol.appendChild(img.closest('picture') || img);
    } else {
      // Text content
      if (index === 0) {
        cell.classList.add('section-label');
      } else if (index === 1) {
        cell.classList.add('section-heading');
      }
      textCol.appendChild(cell);
    }
  });
  
  content.appendChild(textCol);
  content.appendChild(imageCol);
  
  block.innerHTML = '';
  block.appendChild(content);
}
