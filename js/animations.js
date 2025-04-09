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
document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// אפקטי עכבר רק למכשירים תומכי ריחוף
if (window.matchMedia('(hover: hover)').matches) {
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
}

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
