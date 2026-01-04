export default function decorate(block) {
  // EDS converts table to nested divs
  // Each row becomes a div, each cell becomes a child div
  const rows = [...block.children];
  
  rows.forEach((row) => {
    const cells = [...row.children];
    
    // Each row should have 3 cells: title, description, link
    if (cells.length >= 3) {
      const title = cells[0].textContent.trim();
      const description = cells[1].textContent.trim();
      const link = cells[2].textContent.trim();
      
      const card = document.createElement('a');
      card.href = link;
      card.className = 'industry-card';
      
      card.innerHTML = `
        <div class="card-content">
          <h5>${title}</h5>
          <p>${description}</p>
        </div>
        <div class="card-link">
          <span>Explore Further</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;
      
      row.replaceWith(card);
    }
  });
}
