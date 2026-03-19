// ── NAVBAR SCROLL EFFECT ──────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
        }
    });
}

// ── TYPEWRITER EFFECT ─────────────────────────────────────────
const textArray = [
    "Aspiring Finance Professional",
    "MBA Student at SSSIHL",
    "Financial Modeler",
    "Data Analytics Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;
const typeTarget = document.getElementById("typewriter-text");

function type() {
    if (!typeTarget) return;
    if (charIndex < textArray[textIndex].length) {
        typeTarget.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typeTarget.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, typingSpeed + 500);
    }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();

    // Set dynamic footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Start Typewriter Effect
    if (textArray.length && typeTarget) {
        setTimeout(type, 1000);
    }

    // ── ACTIVE NAV LINK ───────────────────────────────────────
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || '';
    const isHome = (currentPage === '' || currentPage === 'index.html');

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (isHome && (href === '/' || href === 'index.html' || href.endsWith('/index.html'))) {
            link.classList.add('active');
        } else if (!isHome && currentPage && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // ── HAMBURGER MENU ────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // ── SCROLL TO TOP ─────────────────────────────────────────
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── ESCAPE KEY CLOSES MODAL ───────────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => {
                if (m.style.display === 'flex') closeModal(m.id);
            });
        }
    });
});

// ── MODAL / POP-UP LOGIC ──────────────────────────────────────
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        const audios = modal.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}

// Close modal on outside click
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR
// Append this block to the END of js/main.js on both sites.
// ═══════════════════════════════════════════════════════════

function initCursor() {
    // Skip on touch devices
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    // ── Create elements ────────────────────────────────────
    const dot  = document.createElement('div')
    const ring = document.createElement('div')
    dot.className  = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    // ── State ──────────────────────────────────────────────
    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let isVisible = false

    // ── Track mouse position ───────────────────────────────
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX
        mouseY = e.clientY

        // Snap dot immediately
        dot.style.left = mouseX + 'px'
        dot.style.top  = mouseY + 'px'

        if (!isVisible) {
            // First move: snap ring too so it doesn't fly in from (0,0)
            ringX = mouseX
            ringY = mouseY
            dot.style.opacity  = '1'
            ring.style.opacity = '1'
            isVisible = true
        }
    })

    // ── Spring-animate the ring (velocity-based for real bounce) ──
    let velX = 0
    let velY = 0
    const STIFFNESS = 0.18   // how strongly it pulls — higher = snappier
    const DAMPING   = 0.72   // how quickly it settles — lower = more bounce

    ;(function animateRing() {
        const dx = mouseX - ringX
        const dy = mouseY - ringY

        velX += dx * STIFFNESS
        velY += dy * STIFFNESS
        velX *= DAMPING
        velY *= DAMPING

        ringX += velX
        ringY += velY

        ring.style.left = ringX + 'px'
        ring.style.top  = ringY + 'px'
        requestAnimationFrame(animateRing)
    })()

    // ── Interactive targets ────────────────────────────────
    const TARGETS = [
        'a', 'button', 'input', 'label', 'select', 'textarea',
        '.filter-pill', '.project-card', '.stat-card', '.skill-tag',
        '.social-icon', '.tab-btn', '.btn-primary', '.btn-secondary',
        '.btn-card', '.card-item', '.toggle-option', '.ba-file-card',
        '.hobby-category', '.home-tech-icon'
    ].join(', ')

    document.addEventListener('mouseover', e => {
        if (e.target.closest(TARGETS)) {
            dot.classList.add('is-hovering')
            ring.classList.add('is-hovering')
        }
    })

    document.addEventListener('mouseout', e => {
        if (e.target.closest(TARGETS)) {
            dot.classList.remove('is-hovering')
            ring.classList.remove('is-hovering')
        }
    })

    // ── Click effect + ripple ──────────────────────────────
    document.addEventListener('mousedown', () => {
        dot.classList.add('is-clicking')
        ring.classList.add('is-clicking')
    })

    document.addEventListener('mouseup', () => {
        dot.classList.remove('is-clicking')
        ring.classList.remove('is-clicking')
    })

    document.addEventListener('click', e => {
        // Only ripple on actual interactive elements
        if (!e.target.closest(TARGETS)) return

        const ripple = document.createElement('div')
        ripple.className = 'cursor-ripple'
        ripple.style.left = mouseX + 'px'
        ripple.style.top  = mouseY + 'px'
        document.body.appendChild(ripple)

        // Remove after animation completes
        ripple.addEventListener('animationend', () => ripple.remove())
    })

    // ── Hide when mouse leaves viewport ───────────────────
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0'
        ring.style.opacity = '0'
        isVisible = false
    })

    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1'
        ring.style.opacity = '1'
        isVisible = true
    })
}

// Initialise after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor)
} else {
    initCursor()
}

