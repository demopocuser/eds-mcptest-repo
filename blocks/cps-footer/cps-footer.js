export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-wrapper';
  
  const columns = document.createElement('div');
  columns.className = 'footer-columns';
  
  // Process all children and organize into columns
  Array.from(block.children).forEach((child) => {
    const column = document.createElement('div');
    column.className = 'footer-column';
    column.appendChild(child.cloneNode(true));
    columns.appendChild(column);
  });
  
  wrapper.appendChild(columns);
  block.innerHTML = '';
  block.appendChild(wrapper);
}
