/**
 * Fairhaven Property Solutions
 * Premium Website JavaScript - ULTRA SMOOTH EDITION
 * Fast, responsive, buttery smooth transitions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initHeader();
  initScrollReveal();
  initMobileMenu();
  initSmoothScroll();
  initFormHandling();
  initFAQ();
  initCounterAnimation();
  initCalendly();
  initGetInTouchModal();
  initHeroCycler();
});

/**
 * Header Module - Sticky nav with smooth transitions
 */
function initHeader() {
  const headerWrapper = document.querySelector('.header-wrapper');
  const topBar = document.querySelector('.top-bar');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    // Add scrolled class for glassmorphism effect
    if (scrollY > 50) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Scroll Reveal Animation - Ultra smooth
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small delay for natural feel
        requestAnimationFrame(() => {
          entry.target.classList.add('active');
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Mobile Menu Module - Fast, smooth
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  function openMenu() {
    toggle.classList.add('active');
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Smooth Scroll Module - Ultra fast
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header-wrapper').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Form Handling Module - Instant feedback
 */
function initFormHandling() {
  const forms = document.querySelectorAll('form[data-form]');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Remove existing messages
      const existingMessage = form.querySelector('.form-message');
      if (existingMessage) {
        existingMessage.remove();
      }

      // Validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      let firstError = null;

      requiredFields.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          if (!firstError) firstError = field;
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        emailField.classList.add('error');
        if (!firstError) firstError = emailField;
      }

      if (!isValid) {
        showFormMessage(form, 'Please fill in all required fields correctly.', 'error');
        if (firstError) firstError.focus();
        return;
      }

      // Submit button state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate submission
      setTimeout(() => {
        showFormMessage(form, 'Thank you! Your message has been sent. We\'ll be in touch within one business day.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 800);
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, message, type) {
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message--${type}`;
  messageEl.textContent = message;

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.parentNode.insertBefore(messageEl, submitBtn);

  if (type === 'success') {
    setTimeout(() => {
      messageEl.style.opacity = '0';
      setTimeout(() => messageEl.remove(), 300);
    }, 5000);
  }
}

/**
 * FAQ Accordion - Smooth expand/collapse
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Counter Animation - Fast, smooth
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.counter);
        const suffix = counter.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);
          
          counter.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Calendly Inline Embed - True inline calendar
 */
function initCalendly() {
  const calendlyContainer = document.getElementById('calendly-embed');
  if (!calendlyContainer) return;

  // Check if Calendly script is loaded
  if (typeof Calendly !== 'undefined') {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/fairhavenpropertysolutions/30min',
      parentElement: calendlyContainer,
      prefill: {},
      utm: {}
    });
  } else {
    // Retry after script loads
    window.addEventListener('calendlyLoaded', function() {
      Calendly.initInlineWidget({
        url: 'https://calendly.com/fairhavenpropertysolutions/30min',
        parentElement: calendlyContainer,
        prefill: {},
        utm: {}
      });
    });
  }
}

/**
 * Get In Touch Floating Modal
 */
function initGetInTouchModal() {
  const fabBtn = document.getElementById('gitFabBtn');
  const modal = document.getElementById('gitModal');
  const closeBtn = document.getElementById('gitModalClose');

  if (!fabBtn || !modal) return;

  fabBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/**
 * Hero Cycling Headline
 */
function initHeroCycler() {
  const el = document.getElementById('heroCycler');
  if (!el) return;

  const words = ['Performance.', 'Management.', 'Expertise.', 'Elevated Results.'];
  let index = 0;

  function cycle() {
    // Fade out
    el.classList.add('fade-out');

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove('fade-out');
    }, 400);
  }

  // Start cycling after initial load animation settles
  setInterval(cycle, 2200);
}

// Console branding
console.log('%c Fairhaven Property Solutions ', 'background: #C89F5E; color: #1A1A1A; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c Grounded Solutions. Elevated Results. ', 'color: #6B7B4C; font-size: 12px;');