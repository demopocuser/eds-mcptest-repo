import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create carousel container
  const slides = [];
  
  // Process each row as a slide
  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    // Get image from row
    const picture = row.querySelector('picture');
    if (picture) {
      slide.appendChild(picture);
    } else {
      // If no picture, check for image URL in text
      const imageUrl = row.textContent.trim();
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Slide ${slides.length + 1}`;
        slide.appendChild(createOptimizedPicture(imageUrl, img.alt, false, [{ width: '1200' }]));
      }
    }
    
    slides.push(slide);
  });

  // Clear block and add slides
  block.innerHTML = '';
  
  // Create slides container
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides';
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
    slidesContainer.appendChild(slide);
  });
  block.appendChild(slidesContainer);

  // Create navigation
  const nav = document.createElement('div');
  nav.className = 'carousel-nav';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav-button carousel-nav-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '&#10094;'; // Left arrow
  
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav-button carousel-nav-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '&#10095;'; // Right arrow
  
  nav.appendChild(prevButton);
  nav.appendChild(nextButton);
  block.appendChild(nav);

  // Carousel state
  let currentSlide = 0;

  // Show slide function
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    currentSlide = index;
  }

  // Navigation handlers
  prevButton.addEventListener('click', () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(newIndex);
  });

  nextButton.addEventListener('click', () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(newIndex);
  });

  // Keyboard navigation
  block.setAttribute('tabindex', '0');
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      nextButton.click();
    }
  });

  // Auto-play (optional - comment out if not needed)
  let autoplayInterval;
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextButton.click();
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  startAutoplay();

  // Pause on hover
  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);
}
