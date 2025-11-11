// ===================================
// ULTRA-MINIMALIST APP - ESSENTIAL ONLY
// ===================================

// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.getElementById('navbarMenu');
  const hamburger = document.getElementById('hamburger');
  
  if (menu && hamburger) {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }
}

// Smooth Scroll for Internal Links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.includes('http')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Close mobile menu if open
          const menu = document.getElementById('navbarMenu');
          const hamburger = document.getElementById('hamburger');
          if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
          }
        }
      }
    });
  });
}

// Click Outside to Close Menu
function setupClickOutside() {
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('navbarMenu');
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (menu && menu.classList.contains('active')) {
      if (!navbar.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
}

// Start Trading Link - Smooth Loading
function initLoginLinks() {
  const loginUrl = 'https://alpha827721.github.io/Login/';
  
  document.querySelectorAll('a[href="' + loginUrl + '"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('loading');
      setTimeout(() => {
        window.location.href = loginUrl;
      }, 600);
    });
  });
}

// Logo Click - Scroll to Top
function initLogoClick() {
  const logo = document.querySelector('.navbar-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Animated Counter
function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      // Format number
      if (target >= 1000000) {
        element.textContent = (current / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        element.textContent = (current / 1000).toFixed(0) + 'K+';
      } else if (target < 10) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }
      requestAnimationFrame(updateCounter);
    } else {
      // Final value
      if (target >= 1000000) {
        element.textContent = (target / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        element.textContent = (target / 1000).toFixed(0) + 'K+';
      } else if (target < 10) {
        element.textContent = target.toFixed(1);
      } else {
        element.textContent = Math.floor(target);
      }
    }
  };
  
  updateCounter();
}

// Intersection Observer for metrics
function initMetricsObserver() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.metric-value');
        counters.forEach(counter => {
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        });
        metricsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const metricsSection = document.querySelector('.animated-metrics');
  if (metricsSection) {
    metricsObserver.observe(metricsSection);
  }
}

// Timeline Premium Scroll Animation (Intersection Observer)
function observeTimelinePremium() {
  const items = document.querySelectorAll('.timeline-item-premium');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });
  
  items.forEach(item => observer.observe(item));
}

// Testimonials Compact Scroll with Drag
function initTestimonialsScroll() {
  const scrollContainer = document.getElementById('testimonialsScrollCompact');
  if (!scrollContainer) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollEnabled = true;
  let autoScrollInterval;
  
  // Mouse drag
  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    autoScrollEnabled = false;
    clearInterval(autoScrollInterval);
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  
  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
  });
  
  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
  });
  
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
  
  // Touch swipe (native)
  scrollContainer.addEventListener('touchstart', () => {
    autoScrollEnabled = false;
    clearInterval(autoScrollInterval);
  }, { passive: true });
  
  // Optional auto-scroll (slow, stops on first input)
  function startAutoScroll() {
    if (!autoScrollEnabled) return;
    
    autoScrollInterval = setInterval(() => {
      if (!autoScrollEnabled) {
        clearInterval(autoScrollInterval);
        return;
      }
      
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll - 10) {
        // Reset to start
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Slow scroll right
        scrollContainer.scrollBy({ left: 1, behavior: 'auto' });
      }
    }, 30); // Slow: 30ms per pixel
  }
  
  // Start auto-scroll after 2 seconds
  setTimeout(() => {
    if (autoScrollEnabled) {
      startAutoScroll();
    }
  }, 2000);
  
  // Stop auto-scroll on any user interaction
  ['wheel', 'scroll', 'touchstart', 'mousedown'].forEach(event => {
    scrollContainer.addEventListener(event, () => {
      autoScrollEnabled = false;
      clearInterval(autoScrollInterval);
    }, { passive: true, once: true });
  });
  
  console.log('✅ Testimonials compact scroll initialized with drag/swipe');
}

// Chat Widget Functions
function initChatWidget() {
  const chatButton = document.getElementById('chatButton');
  const chatPanel = document.getElementById('chatPanel');
  const chatOverlay = document.getElementById('chatOverlay');
  const closeChat = document.getElementById('closeChat');
  const liveAgentBtn = document.getElementById('liveAgentBtn');
  const faqBtn = document.getElementById('faqBtn');
  
  // Open chat
  if (chatButton) {
    chatButton.addEventListener('click', () => {
      chatPanel.classList.add('active');
      chatOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close chat
  function closeChatPanel() {
    chatPanel.classList.remove('active');
    chatOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (closeChat) {
    closeChat.addEventListener('click', closeChatPanel);
  }
  
  if (chatOverlay) {
    chatOverlay.addEventListener('click', closeChatPanel);
  }
  
  // Live Agent - Open Telegram
  if (liveAgentBtn) {
    liveAgentBtn.addEventListener('click', () => {
      window.open('https://t.me/+5UTu3fqDZOQ0YzBk', '_blank');
    });
  }
  
  // FAQ - Navigate to FAQ page
  if (faqBtn) {
    faqBtn.addEventListener('click', () => {
      window.location.href = '/faq';
    });
  }
}



// Initialize Everything
function init() {
  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // Initialize features
  initSmoothScroll();
  setupClickOutside();
  initLoginLinks();
  initLogoClick();
  initChatWidget();
  initMetricsObserver();
  initTestimonialsScroll();
  observeTimelinePremium();
  
  console.log('AlphaAi PREMIUM FINAL - 3 TASKS COMPLETATI');
  console.log('✅ TASK 1: Testimonials Compatte - Come Trusted Exchanges');
  console.log('✅ TASK 2: Timeline 2021-2025 - Fluida moderna con icone e animazioni');
  console.log('✅ TASK 3: Analisi Completa - Bilanciamento, fluidità, ottimizzazioni');
  console.log('✅ Mobile: Timeline 70% width, Testimonials NO deform');
  console.log('✅ Desktop: Layout alternato, hover effects, smooth transitions');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}