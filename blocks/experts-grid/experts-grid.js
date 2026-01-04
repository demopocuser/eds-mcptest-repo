export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'experts-container';
  
  rows.forEach((row, index) => {
    const cells = [...row.children];
    
    // First 3 rows are header content (label, heading, description)
    if (index === 0) {
      cells[0].classList.add('section-label');
    } else if (index === 1) {
      cells[0].classList.add('section-heading');
    } else if (index === 2) {
      cells[0].classList.add('section-description');
    } else if (cells.length >= 5) {
      // Expert rows: image, name, title, location, link
      const expertCard = document.createElement('a');
      expertCard.className = 'expert-card';
      
      const image = cells[0].querySelector('img');
      const name = cells[1].textContent.trim();
      const title = cells[2].textContent.trim();
      const location = cells[3].textContent.trim();
      const link = cells[4].textContent.trim();
      
      expertCard.href = link;
      
      expertCard.innerHTML = `
        <div class="expert-image">
          ${image ? `<img src="${image.src}" alt="${image.alt || name}">` : ''}
        </div>
        <div class="expert-info">
          <h5>${name}</h5>
          <p class="expert-title">${title}</p>
          <p class="expert-location">${location}</p>
        </div>
      `;
      
      grid.appendChild(expertCard);
    }
  });
  
  // Keep first 3 rows as header, append experts grid
  while (block.children.length > 3) {
    block.removeChild(block.lastChild);
  }
  block.appendChild(grid);
}
