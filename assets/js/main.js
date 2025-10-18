document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const yearEl = document.getElementById('year');
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  const dots = Array.from(document.querySelectorAll('.hero__dot'));
  const conceptSlides = Array.from(document.querySelectorAll('.concept-slide'));
  const conceptDots = Array.from(document.querySelectorAll('.concept-slider__dot'));
  const conceptPrev = document.querySelector('.concept-slider__control--prev');
  const conceptNext = document.querySelector('.concept-slider__control--next');
  const conceptSlider = document.querySelector('.concept-slider');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('is-open');
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
      });
    });
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (slides.length > 1 && slides.length === dots.length) {
    let currentIndex = 0;
    let autoplayId;
    const delay = 6000;

    const activateSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      currentIndex = index;
    };

    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      activateSlide(nextIndex);
    };

    const startAutoplay = () => {
      autoplayId = window.setInterval(nextSlide, delay);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = undefined;
      }
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        activateSlide(index);
        startAutoplay();
      });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoplay);
      heroSection.addEventListener('mouseleave', () => {
        if (!autoplayId) {
          startAutoplay();
        }
      });
    }

    activateSlide(0);
    startAutoplay();
  }

  if (conceptSlides.length) {
    let conceptIndex = conceptSlides.findIndex((slide) => slide.classList.contains('is-active'));
    if (conceptIndex < 0) {
      conceptIndex = 0;
      conceptSlides[0].classList.add('is-active');
      if (conceptDots[0]) {
        conceptDots[0].classList.add('is-active');
        conceptDots[0].setAttribute('aria-selected', 'true');
      }
    }

    conceptSlides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index === conceptIndex ? 'false' : 'true');
    });

    const activateConceptSlide = (index) => {
      const normalized = (index + conceptSlides.length) % conceptSlides.length;
      conceptSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === normalized);
        slide.setAttribute('aria-hidden', i === normalized ? 'false' : 'true');
      });
      conceptDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === normalized);
        dot.setAttribute('aria-selected', i === normalized ? 'true' : 'false');
      });
      conceptIndex = normalized;
    };

    if (conceptPrev) {
      conceptPrev.addEventListener('click', () => {
        activateConceptSlide(conceptIndex - 1);
      });
    }

    if (conceptNext) {
      conceptNext.addEventListener('click', () => {
        activateConceptSlide(conceptIndex + 1);
      });
    }

    conceptDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        activateConceptSlide(index);
      });
    });

    if (conceptSlider) {
      conceptSlider.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          activateConceptSlide(conceptIndex - 1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          activateConceptSlide(conceptIndex + 1);
        }
      });
    }
  }
});
