export default function decorate(block) {
  // EDS converts the table to divs
  // Row 1: block name (already removed by EDS)
  // Row 2: label text
  // Row 3: heading text
  // Row 4: description text
  const rows = [...block.children];
  
  if (rows.length >= 3) {
    const label = rows[0];
    const heading = rows[1];
    const description = rows[2];

    if (label) label.classList.add('hero-label');
    if (heading) heading.classList.add('hero-heading');
    if (description) description.classList.add('hero-description');
  }
}
