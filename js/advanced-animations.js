document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    gsap.to(element, {
      y: 'random(-50, 50)',
      x: 'random(-30, 30)',
      rotation: 'random(-10, 10)',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  const heroTimeline = gsap.timeline();
  heroTimeline.from('.hero-section h1', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-section .lead', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.headshot-container', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.special-offer-box', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, '-=0.4')
    .from('.btn-primary-custom', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');
  gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
  const formSection = document.querySelector('.form-section');
  if (formSection) {
    gsap.from(formSection, {
      scrollTrigger: {
        trigger: formSection,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
  const lucideIcons = document.querySelectorAll('.lucide-animated');
  lucideIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.2,
        rotate: 5,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power1.in'
      });
    });
  });
  const floatingIcons = document.querySelectorAll('.floating-icon');
  const animateIcons = () => {
    floatingIcons.forEach((icon, index) => {
      gsap.from(icon, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.3,
        ease: 'power3.out'
      });
    });
  };
  const animateFloatingButtons = () => {
    floatingIcons.forEach((icon, index) => {
      gsap.to(icon, {
        y: index % 2 === 0 ? -10 : 10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        delay: index * 0.2
      });
    });
  };
  if (!document.body.classList.contains('reduce-motion')) {
    setTimeout(() => {
      animateIcons();
      animateFloatingButtons();
    }, 200);
  }
  console.log('Advanced animations initialized successfully');
})();
