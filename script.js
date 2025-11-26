// Notekit Website JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Update API URL from environment or config
  const activationForm = document.getElementById('activation-form');
  if (activationForm) {
    // This will be set from your Vercel environment
    const apiUrl = window.API_BASE_URL || 'https://www.notekit.co/api';
    // Store for use in activation script
    window.API_BASE_URL = apiUrl;
  }
  
  // Animated typing effect for Notekit demo
  const typingText = document.querySelector('.demo-typing-text');
  if (typingText) {
    const texts = [
      'Meeting notes from today\'s standup...',
      'Quick capture: Great article about productivity',
      'Project ideas for Q2 roadmap'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeText, 2000); // Wait 2 seconds before deleting
          return;
        }
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeText, speed);
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
  }
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: var(--spacing-md);
      box-shadow: var(--shadow-lg);
      display: none;
      border-top: 1px solid var(--gray-200);
    }
    
    .nav-menu.mobile-open {
      display: flex;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;
document.head.appendChild(style);

