// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Parallax background effect
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

  // Hero section animations
  const heroTimeline = gsap.timeline();
  heroTimeline
    .from('.hero-section h1', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-section .lead', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.special-offer-box', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.btn-primary-custom', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

  // Card animations
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

  // Form section animations
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

  // Lucide icons animation
  const lucideIcons = document.querySelectorAll('.lucide-animated');
  lucideIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll('.btn-primary-custom');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Form input animations
  const formInputs = document.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Scroll progress indicator
  const scrollProgress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    gsap.to(scrollProgress, {
      scaleX: scrolled / 100,
      duration: 0.1,
      ease: 'none'
    });
  });

  // Smooth scroll for navigation links - Fixed implementation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Use standard window.scrollTo instead of GSAP's scrollTo plugin
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          document.body.classList.remove('menu-open');
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

  // 3D card effect
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // Special offer box animation
  const specialOfferBox = document.querySelector('.special-offer-box');
  if (specialOfferBox) {
    gsap.to(specialOfferBox, {
      y: 'random(-5, 5)',
      rotation: 'random(-2, 2)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

// Carousel animations - simplified
const servicesCarousel = document.getElementById('servicesCarousel');
if (servicesCarousel) {
  // 1. קביעת מאפייני הקרוסלה
  const carousel = new bootstrap.Carousel(servicesCarousel, {
    interval: 5000,
    wrap: true,
    keyboard: true,
    pause: 'hover'
  });

  // 2. הנפשה מינימלית ופשוטה
  servicesCarousel.addEventListener('slide.bs.carousel', function(e) {
    const activeItem = servicesCarousel.querySelector('.carousel-item.active');
    const nextItem = e.relatedTarget;
    
    // קביעת כיוון ההנפשה (שמאלה או ימינה)
    const isNextDirection = e.direction === 'left'; // בסביבה LTR, כיוון "left" הוא הכיוון הרגיל
    
    if (activeItem && nextItem) {
      // עצירת כל ההנפשות הקודמות
      gsap.killTweensOf([activeItem, nextItem]);
      
      // הנפשת היציאה של האלמנט הנוכחי
      gsap.to(activeItem, {
        x: isNextDirection ? '-100%' : '100%',
        duration: 0.6,
        ease: 'power2.inOut',
        clearProps: 'all'
      });
      
      // הנפשת הכניסה של האלמנט הבא
      gsap.fromTo(nextItem, 
        { 
          x: isNextDirection ? '100%' : '-100%',
          opacity: 1
        },
        { 
          x: '0%', 
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }
  });
  
  // 3. ניקוי הסגנונות לאחר המעבר
  servicesCarousel.addEventListener('slid.bs.carousel', function() {
    const allItems = servicesCarousel.querySelectorAll('.carousel-item');
    allItems.forEach(item => {
      gsap.set(item, { clearProps: 'all' });
    });
  });
  
  // 4. אפקט רחיפה פשוט לכפתורי הקרוסלה
  const carouselControls = servicesCarousel.querySelectorAll('.carousel-control-prev, .carousel-control-next');
  carouselControls.forEach(control => {
    control.addEventListener('mouseenter', () => {
      gsap.to(control, { 
        opacity: 1,
        scale: 1.1,
        duration: 0.3 
      });
    });
    
    control.addEventListener('mouseleave', () => {
      gsap.to(control, { 
        opacity: 0.8,
        scale: 1,
        duration: 0.3 
      });
    });
  });
}

// הסרת קוד setupMobileCarousel המקורי
// במקום זה, קוד פשוט שיוודא שהמעברים עובדים תקין במובייל
function setupCarouselResponsive() {
  const servicesCarousel = document.getElementById('servicesCarousel');
  if (servicesCarousel) {
    // וידוא שהכפתורים גלויים בכל המכשירים
    const carouselControls = servicesCarousel.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
      control.style.display = 'flex';
    });
  }
}

window.addEventListener('resize', setupCarouselResponsive);
setupCarouselResponsive();

  // אייקונים צפים - שיפור האנימציה
  const floatingIcons = document.querySelectorAll('.floating-icon');
  floatingIcons.forEach((icon, index) => {
    // אנימציית כניסה
    gsap.from(icon, {
      x: -50,
      opacity: 0,
      duration: 0.7,
      delay: 0.5 + (index * 0.2),
      ease: 'power2.out',
      onComplete: function() {
        // וידוא שהאייקונים נשארים במקומם לאחר האנימציה
        gsap.set(icon, { clearProps: "x,opacity" });
        
        // תנועה קלה לאחר הכניסה - אפקט ציפה
        gsap.to(icon, {
          y: 'random(-8, 8)',
          duration: 2 + (index * 0.5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 0.2
        });
      }
    });
    
    // אנימציית hover משופרת
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.15,
        boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
        y: -5,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        y: 0,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // אנימציית כניסה לדף
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    onComplete: function() {
      // הדגשת קריאות בדף
      gsap.to('.special-offer-box, .btn-primary-custom', {
        boxShadow: '0 0 20px rgba(var(--primary-color-rgb), 0.4)',
        repeat: 2,
        yoyo: true,
        duration: 1,
        delay: 1
      });
    }
  });

  // Performance optimization
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  });
});