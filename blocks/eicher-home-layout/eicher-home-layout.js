export default function decorate(block) {
  // Get all child divs
  const children = Array.from(block.children);
  
  if (children.length === 0) return;
  
  // First child should be the wrapper
  const wrapper = children[0];
  const wrapperChildren = Array.from(wrapper.children);
  
  if (wrapperChildren.length < 2) return;
  
  // First element is company-info
  const companyInfo = wrapperChildren[0];
  companyInfo.classList.add('company-info');
  
  // Add class to report button link
  const reportLink = companyInfo.querySelector('a');
  if (reportLink && reportLink.classList.contains('report-button')) {
    reportLink.classList.add('button', 'primary');
  }
  
  // Second element is product-cards container
  const cardsContainer = wrapperChildren[1];
  cardsContainer.classList.add('product-cards');
  
  // Add classes to product cards
  const productCards = cardsContainer.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    // Add classes to card links
    const links = card.querySelectorAll('a');
    links.forEach((link) => {
      if (link.classList.contains('card-link')) {
        link.classList.add('arrow-link');
      }
    });
  });
}
