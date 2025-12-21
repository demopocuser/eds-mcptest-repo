export default function decorate(block) {
  // Get the breadcrumb list
  const nav = block.querySelector('ul');
  if (nav) {
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Breadcrumb');
  }
}
