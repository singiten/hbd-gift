// ===== MUSIC CONTROLS =====
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇 Play Music';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play().catch(function(error) {
            console.log('Auto-play prevented. User must interact first.');
            // Fallback: Try to play on next user interaction
            document.addEventListener('touchstart', function playOnTouch() {
                bgMusic.play().catch(() => {});
                document.removeEventListener('touchstart', playOnTouch);
            }, { once: true });
        });
        musicBtn.textContent = '🔊 Playing...';
        musicBtn.classList.add('playing');
        isPlaying = true;
    }
});

// ===== SURPRISE BUTTON =====
document.getElementById('surpriseBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Show hidden message
    const message = document.getElementById('surpriseMessage');
    message.classList.remove('hidden');
    
    // Confetti explosion 1 (center)
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5576c', '#f093fb', '#667eea', '#ffd93d', '#6bcb77']
    });
    
    // Confetti explosion 2 (after delay)
    setTimeout(() => {
        confetti({
            particleCount: 60,
            spread: 90,
            origin: { y: 0.4 },
            colors: ['#ffd93d', '#f5576c', '#6bcb77', '#4d96ff']
        });
    }, 200);
    
    // Confetti explosion 3 (from sides)
    setTimeout(() => {
        confetti({
            particleCount: 40,
            spread: 50,
            origin: { x: 0.1, y: 0.5 },
            colors: ['#f093fb', '#ffd93d']
        });
        confetti({
            particleCount: 40,
            spread: 50,
            origin: { x: 0.9, y: 0.5 },
            colors: ['#667eea', '#f5576c']
        });
    }, 400);
    
    // Button feedback (mobile friendly)
    const originalText = this.textContent;
    this.textContent = '🎉 Surprise! 🎉';
    this.style.opacity = '0.8';
    setTimeout(() => {
        this.textContent = originalText;
        this.style.opacity = '1';
    }, 2500);
});

// ===== FLOATING BALLOONS (Optimized for mobile) =====
function createFloatingBalloon() {
    const balloon = document.createElement('div');
    const emojis = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Smaller balloons on mobile
    const size = window.innerWidth < 768 ? 1.5 + Math.random() * 1 : 2 + Math.random() * 2;
    
    balloon.style.cssText = `
        position: fixed;
        font-size: ${size}rem;
        left: ${Math.random() * 95}%;
        top: -50px;
        opacity: ${0.2 + Math.random() * 0.3};
        pointer-events: none;
        z-index: 0;
        animation: floatUp ${18 + Math.random() * 20}s linear forwards;
        animation-delay: ${Math.random() * 3}s;
        will-change: transform;
    `;
    document.body.appendChild(balloon);
    
    setTimeout(() => {
        balloon.remove();
    }, 40000);
}

// Add the floatUp keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.2;
        }
        10% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-110vh) rotate(720deg) scale(0.3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// Create balloons less frequently on mobile to save performance
const balloonInterval = window.innerWidth < 768 ? 4000 : 3000;
setInterval(createFloatingBalloon, balloonInterval);

// Create initial balloons
for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingBalloon, i * 1500);
}

// ===== SCROLL ANIMATION (Optimized) =====
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.photo-card, .message-card, .surprise-btn').forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ===== TOUCH FEEDBACK (Mobile) =====
document.querySelectorAll('button, .photo-card').forEach(function(el) {
    el.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
    }, { passive: true });
    
    el.addEventListener('touchend', function() {
        this.style.opacity = '1';
    }, { passive: true });
});

console.log('🎂 Happy Birthday! 🎂');
console.log('📱 Optimized for mobile!');