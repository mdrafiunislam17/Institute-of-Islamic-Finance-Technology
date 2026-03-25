// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Sticky Navbar Background and Shadow on Scroll
const navbar = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
});

// Student Reviews Slider Logic (Custom Transform with Auto-Play)
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("reviews-slider-track");
    const prevBtn = document.getElementById("review-btn-prev");
    const nextBtn = document.getElementById("review-btn-next");
    const container = document.getElementById("reviews-slider-container");

    if (!track || !prevBtn || !nextBtn || !container) return;

    let currentIndex = 0;
    const gap = 24; // Tailwind gap-6 is 24px
    let autoSlideInterval;
    const AUTO_SLIDE_SPEED = 5000;

    function updateSlider() {
        const totalCards = track.children.length;
        if (totalCards === 0) return;

        // Determine visible cards
        let visibleCards = 1;
        if (window.innerWidth >= 1024) visibleCards = 3;
        else if (window.innerWidth >= 640) visibleCards = 2;

        const maxIndex = totalCards - visibleCards;
        
        // Strict boundaries
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const cardWidth = track.children[0].offsetWidth;
        const translateX = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${translateX}px)`;

        // Update Button States
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.setAttribute("aria-disabled", currentIndex === 0 ? "true" : "false");
        nextBtn.setAttribute("aria-disabled", currentIndex >= maxIndex ? "true" : "false");
    }

    // Auto-slide logic
    function jumpToNext() {
        const totalCards = track.children.length;
        let visibleCards = 1;
        if (window.innerWidth >= 1024) visibleCards = 3;
        else if (window.innerWidth >= 640) visibleCards = 2;
        
        const maxIndex = totalCards - visibleCards;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back to start
        }
        updateSlider();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(jumpToNext, AUTO_SLIDE_SPEED);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    // Event Listeners
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateSlider();
    });

    // Pause on hover
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    // Initial setup
    window.addEventListener("resize", updateSlider);
    setTimeout(() => {
        updateSlider();
        startAutoSlide();
    }, 50);
});

// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }
});

// Parallax text effect
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    
    // Horizontal text parallax
    const parallaxTexts = document.querySelectorAll('.parallax-text');
    parallaxTexts.forEach(el => {
        let speed = parseFloat(el.getAttribute('data-speed')) || 1;
        // Move horizontally based on scroll
        el.style.transform = `translateX(calc(-50% - ${scrollY * speed * 0.1}px))`;
    });
    
    // Vertical image parallax
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    parallaxImgs.forEach(el => {
        let speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
        // Move vertically based on scroll
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Courses Slider Logic (Custom Transform)
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("courses-slider-track");
    const prevBtn = document.getElementById("slider-btn-prev");
    const nextBtn = document.getElementById("slider-btn-next");

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const gap = 24; // Tailwind gap-6 is 1.5rem = 24px

    function updateSlider() {
        const totalCards = track.children.length;
        if (totalCards === 0) return;

        // Determine visible cards based on screen size
        let visibleCards = 1; // default mobile
        if (window.innerWidth >= 1024) {
            visibleCards = 3; // lg
        } else if (window.innerWidth >= 640) {
            visibleCards = 2; // sm
        }

        const maxIndex = totalCards - visibleCards;
        
        // Boundaries
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        // Calculate card width and transform
        const cardWidth = track.children[0].offsetWidth;
        const translateX = -(currentIndex * (cardWidth + gap));

        // Apply transform smoothly (transition already in CSS, but make sure)
        track.style.transform = `translateX(${translateX}px)`;

        // Update Button States
        if (currentIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.setAttribute("aria-disabled", "true");
        } else {
            prevBtn.disabled = false;
            prevBtn.setAttribute("aria-disabled", "false");
        }

        if (currentIndex === maxIndex || maxIndex <= 0) {
            nextBtn.disabled = true;
            nextBtn.setAttribute("aria-disabled", "true");
        } else {
            nextBtn.disabled = false;
            nextBtn.setAttribute("aria-disabled", "false");
        }
    }

    // Event Listeners
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateSlider();
    });

    // Handle Resize
    window.addEventListener("resize", updateSlider);

    // Initial State Check
    // Small timeout to ensure DOM is fully painted for precise width calculation
    setTimeout(updateSlider, 50); 
});

// Social Media Carousel Logic
document.addEventListener("DOMContentLoaded", () => {
    const socialGallery = document.getElementById('social-gallery');
    const socialPrev = document.getElementById('social-prev');
    const socialNext = document.getElementById('social-next');

    if (socialGallery && socialPrev && socialNext) {
        // Arrow scrolling with smooth behavior
        socialPrev.addEventListener('click', () => {
            const card = socialGallery.querySelector('a');
            if (card) {
                const cardWidth = card.offsetWidth + 16; // 16px is the gap-4
                socialGallery.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        });

        socialNext.addEventListener('click', () => {
            const card = socialGallery.querySelector('a');
            if (card) {
                const cardWidth = card.offsetWidth + 16;
                socialGallery.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });

        // Optional: Hide/Disable buttons at the ends of the scroll
        const manageSocialButtons = () => {
            const maxScrollLeft = socialGallery.scrollWidth - socialGallery.clientWidth;
            
            if (socialGallery.scrollLeft <= 0) {
                socialPrev.style.opacity = '0.5';
                socialPrev.style.pointerEvents = 'none';
            } else {
                socialPrev.style.opacity = '1';
                socialPrev.style.pointerEvents = 'auto';
            }

            if (socialGallery.scrollLeft >= maxScrollLeft - 1) { // -1 to account for rounding errors
                socialNext.style.opacity = '0.5';
                socialNext.style.pointerEvents = 'none';
            } else {
                socialNext.style.opacity = '1';
                socialNext.style.pointerEvents = 'auto';
            }
        };

        // Initialize state
        manageSocialButtons();
        
        // Listen to scroll events to update button states
        socialGallery.addEventListener('scroll', () => {
            // Debounce or directly call
            manageSocialButtons();
        });
        
        window.addEventListener('resize', manageSocialButtons);
    }
});
