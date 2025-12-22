export default function decorate(block) {
  block.setAttribute('role', 'alert');
  block.setAttribute('aria-live', 'polite');
}
