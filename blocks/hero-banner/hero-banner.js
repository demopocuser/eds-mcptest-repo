export default function decorate(block) {
  // Simple hero banner - just displays the image
  const img = block.querySelector('img');
  if (img) {
    img.classList.add('hero-image');
  }
}
