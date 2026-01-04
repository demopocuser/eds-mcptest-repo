export default function decorate(block) {
  // EDS table rows:
  // Row 1: label
  // Row 2: heading
  // Row 3: description
  // Row 4: career text
  // Row 5: link
  const rows = [...block.children];
  
  if (rows.length >= 5) {
    const label = rows[0];
    const heading = rows[1];
    const description = rows[2];
    const careerText = rows[3];
    const linkRow = rows[4];
    const link = linkRow.querySelector('a');

    if (label) label.classList.add('cta-label');
    if (heading) heading.classList.add('cta-heading');
    if (description) description.classList.add('cta-description');
    if (careerText) careerText.classList.add('career-text');
    if (link) {
      link.classList.add('career-link');
      const arrow = document.createElement('svg');
      arrow.setAttribute('width', '20');
      arrow.setAttribute('height', '20');
      arrow.setAttribute('viewBox', '0 0 20 20');
      arrow.setAttribute('fill', 'none');
      arrow.innerHTML = '<path d="M7 4L14 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      link.appendChild(arrow);
    }
  }
}
