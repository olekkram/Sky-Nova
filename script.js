// === CREATE STARS IN HERO ===
function createStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;
    
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Roughly 50/50 blue and white stars
        if (Math.random() > 0.5) {
            star.classList.add('blue');
        } else {
            star.classList.add('white');
        }
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay for staggered twinkling
        star.style.animationDelay = Math.random() * 4 + 's';
        
        container.appendChild(star);
    }
}

// === SMOOTH SCROLL FOR NAVIGATION ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// === FADE IN ON SCROLL ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    }
});

// === SPECIAL FADE-IN FOR THE CITY SECTION ===
const citySection = document.querySelector('#the-city');
if (citySection) {
    const cityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll('.city-content p');
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.animationPlayState = 'running';
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.3 });
    
    cityObserver.observe(citySection);
}

// === TRACK CARD CLICK HANDLER ===
document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.track-title').textContent;
        console.log('Playing:', title);
        // Here you can add actual music player functionality
    });
});

// === MEMBER CARD HOVER ANIMATION ===
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// === INITIALIZE ON LOAD ===
window.addEventListener('load', () => {
    createStars();
    console.log('ðŸŽ¸ Sky Nova - Stories from one fictional city');
    console.log('Website loaded and ready');
});

// === PARALLAX EFFECT FOR HERO (subtle) ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});