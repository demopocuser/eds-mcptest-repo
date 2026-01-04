export default function decorate(block) {
  const rows = [...block.children];
  const cards = document.createElement('div');
  cards.className = 'cards-container';
  
  rows.forEach((row, index) => {
    const cells = [...row.children];
    
    // First 3 rows are header content (label, heading, description)
    if (index === 0) {
      cells[0].classList.add('section-label');
    } else if (index === 1) {
      cells[0].classList.add('section-heading');
    } else if (index === 2) {
      cells[0].classList.add('section-description');
    } else if (cells.length >= 4) {
      // Card rows: image, title, description, link
      const card = document.createElement('a');
      card.className = 'approach-card';
      
      const image = cells[0].querySelector('img');
      const title = cells[1].textContent.trim();
      const desc = cells[2].textContent.trim();
      const link = cells[3].textContent.trim();
      
      card.href = link;
      
      card.innerHTML = `
        <div class="card-image">
          ${image ? `<img src="${image.src}" alt="${image.alt || title}">` : ''}
        </div>
        <div class="card-content">
          <h5>${title}</h5>
          <p>${desc}</p>
        </div>
      `;
      
      cards.appendChild(card);
    }
  });
  
  // Keep first 3 rows as header, append cards container
  while (block.children.length > 3) {
    block.removeChild(block.lastChild);
  }
  block.appendChild(cards);
}
