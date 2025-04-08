// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.dataset.aos) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Card hover effect with 3D rotation
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Lucide icons animation
document.querySelectorAll('.lucide-animated').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.2) rotate(5deg)';
    icon.style.strokeWidth = '3';
  });
  
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1) rotate(0)';
    icon.style.strokeWidth = '2';
  });
});

// Form input animations
document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', () => {
    input.style.transform = 'translateY(-2px)';
    input.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  });
  
  input.addEventListener('blur', () => {
    input.style.transform = 'translateY(0)';
    input.style.boxShadow = 'none';
  });
});

// Button ripple effect
document.querySelectorAll('.btn-primary-custom').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Section transition animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.classList.add('loaded');
  });
});

// Performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Update parallax and other scroll-based animations
      ticking = false;
    });
    ticking = true;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });

  // Initialize Lucide icons
  lucide.createIcons();

  // Add loaded class to images
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
  });

  // Mobile menu fix
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
      
      if (!isClickInside && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  }

  // Ripple effect for buttons
  document.querySelectorAll('.btn-primary-custom').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // Active navigation link update
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Form validation and animation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i data-lucide="loader" class="lucide-animated"></i> טוען...';
      lucide.createIcons();
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        lucide.createIcons();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = 'תודה! נחזור אליך בהקדם.';
        this.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 2000);
    });
  }

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Special offer box animation
  const specialOfferBox = document.querySelector('.special-offer-box');
  if (specialOfferBox) {
    let isAnimating = false;
    
    specialOfferBox.addEventListener('mouseenter', () => {
      if (!isAnimating) {
        isAnimating = true;
        specialOfferBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
          isAnimating = false;
        }, 300);
      }
    });
    
    specialOfferBox.addEventListener('mouseleave', () => {
      specialOfferBox.style.transform = 'scale(1)';
    });
  }


  // Performance optimization
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Update scroll-based animations here
        ticking = false;
      });
      ticking = true;
    }
  });
});