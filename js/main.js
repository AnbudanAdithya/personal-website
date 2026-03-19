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

// ═══════════════════════════════════════════════════════════════
// VISUAL EFFECTS — Append to END of js/main.js on BOTH sites
// Options: 1 scroll reveal, 2 page load, 3 particles,
//          4 gradient pulse, 5 grain (CSS only),
//          6 3D tilt, 7 magnetic, 8 progress bar, 9 smooth scroll
// ═══════════════════════════════════════════════════════════════


// ── 8. SCROLL PROGRESS BAR ────────────────────────────────────
function initScrollProgress() {
    const bar = document.createElement('div')
    bar.id = 'scroll-progress'
    document.body.prepend(bar)

    window.addEventListener('scroll', () => {
        const total  = document.documentElement.scrollHeight - window.innerHeight
        const pct    = total > 0 ? (window.scrollY / total) * 100 : 0
        bar.style.width = pct + '%'
    }, { passive: true })
}


// ── 1. SCROLL REVEAL ──────────────────────────────────────────
function initScrollReveal() {
    // Mark elements to reveal
    const singleSelectors = [
        '.section-header', '.section-title', '.page-subtitle',
        '.about-content', '.intro-text', '.intro-avatar',
        '.quote-box', '.hero-tag', '.model-hero-content',
        '.cv-download-section', '.social-section h2',
        '.social-section p', '.hero-sub',
        '.filter-pills', '.about-content h2', '.about-content p'
    ]

    // Stagger grids
    const staggerSelectors = [
        '.cards-grid', '.projects-grid', '.resume-container',
        '.skills-grid', '.home-tech-grid', '.social-links',
        '.hero-stats', '.hero-buttons', '.modal-audio-list',
        '.ba-files-grid', '.ba-findings', '.correlation-grid',
        '.dash-kpis', '.dash-charts-grid'
    ]

    singleSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            // Skip if already inside a stagger container
            if (!el.closest('.reveal-stagger')) {
                el.classList.add('reveal')
            }
        })
    })

    staggerSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal-stagger')
        })
    })

    // Also reveal individual cards not already in a stagger group
    document.querySelectorAll(
        '.timeline-card, .stat-card, .skill-tag, .audio-item, .ba-file-card, .kpi-card'
    ).forEach(el => {
        if (!el.closest('.reveal-stagger')) el.classList.add('reveal')
    })

    // IntersectionObserver triggers .revealed
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed')
                io.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el))
}


// ── 2. PAGE LOAD ENTRANCE ─────────────────────────────────────
function initHeroEntrance() {
    // Ordered list of selectors — first match per item gets animated
    const sequence = [
        ['.hero-tag', 'fx-load fx-d1'],
        ['.hero h1, .model-hero h1', 'fx-load fx-d2'],
        ['.hero h1:nth-of-type(2)', 'fx-load fx-d3'],
        ['.typewriter-wrapper, .hero-sub', 'fx-load fx-d3'],
        ['.hero-buttons', 'fx-load fx-d4'],
        ['.hero-image, .hero-stats', 'fx-load-pop fx-d5'],
    ]

    sequence.forEach(([selectors, classes]) => {
        const el = document.querySelector(selectors)
        if (el) classes.split(' ').forEach(c => el.classList.add(c))
    })
}


// ── 3. PARTICLES ──────────────────────────────────────────────
function initParticles() {
    // Find hero container — works on both sites
    const heroContainer = document.querySelector('.hero-wrapper') || document.querySelector('.hero')
    if (!heroContainer) return

    const canvas = document.createElement('canvas')
    canvas.id = 'particle-canvas'
    heroContainer.insertBefore(canvas, heroContainer.firstChild)

    const ctx = canvas.getContext('2d')
    let W, H, particles = []

    const NUM_PARTICLES = 55
    const ACCENT = '240,192,64'
    const WHITE  = '200,210,230'

    function resize() {
        W = canvas.width  = heroContainer.offsetWidth
        H = canvas.height = heroContainer.offsetHeight
    }

    function makeParticle() {
        return {
            x: Math.random() * (W || 800),
            y: Math.random() * (H || 600),
            r: Math.random() * 1.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.5 + 0.15,
            color: Math.random() > 0.65 ? ACCENT : WHITE,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.012
        }
    }

    function init() {
        resize()
        particles = Array.from({ length: NUM_PARTICLES }, makeParticle)
    }

    function draw() {
        ctx.clearRect(0, 0, W, H)

        particles.forEach(p => {
            p.pulse += p.pulseSpeed
            const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${p.color},${a.toFixed(2)})`
            ctx.fill()

            p.x += p.vx
            p.y += p.vy

            // Wrap around edges
            if (p.x < -5)  p.x = W + 5
            if (p.x > W+5) p.x = -5
            if (p.y < -5)  p.y = H + 5
            if (p.y > H+5) p.y = -5
        })

        // Draw faint connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx  = particles[i].x - particles[j].x
                const dy  = particles[i].y - particles[j].y
                const dist = Math.sqrt(dx*dx + dy*dy)
                if (dist < 90) {
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.strokeStyle = `rgba(240,192,64,${(0.07 * (1 - dist/90)).toFixed(3)})`
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            }
        }

        requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', () => { resize(); init() }, { passive: true })
}



// ── 6. 3D CARD TILT ───────────────────────────────────────────
function initCardTilt() {
    const TILT_MAX = 8   // degrees
    const cards = document.querySelectorAll('.project-card, .card-item, .timeline-card, .stat-card')

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect()
            const cx     = rect.left + rect.width  / 2
            const cy     = rect.top  + rect.height / 2
            const dx     = (e.clientX - cx) / (rect.width  / 2)
            const dy     = (e.clientY - cy) / (rect.height / 2)

            const rotY = dx * TILT_MAX
            const rotX = -dy * TILT_MAX

            card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`

            // Update CSS vars for inner glow position
            const mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%'
            const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%'
            card.style.setProperty('--mx', mx)
            card.style.setProperty('--my', my)
        }, { passive: true })

        card.addEventListener('mouseleave', () => {
            card.style.transform = ''
        })
    })
}


// ── 7. MAGNETIC BUTTONS ───────────────────────────────────────
function initMagneticButtons() {
    const PULL     = 0.38   // how strongly it pulls (0–1)
    const RADIUS   = 90     // px from center to start pulling

    const buttons = document.querySelectorAll(
        '.btn-primary, .social-icon, .filter-pill.active'
    )

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect()
            const cx   = rect.left + rect.width  / 2
            const cy   = rect.top  + rect.height / 2
            const dx   = e.clientX - cx
            const dy   = e.clientY - cy
            const dist = Math.sqrt(dx*dx + dy*dy)

            if (dist < RADIUS) {
                const tx = dx * PULL
                const ty = dy * PULL
                btn.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`
            }
        }, { passive: true })

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = ''
        })
    })
}


// ── 9. SMOOTH SCROLL WITH MOMENTUM ────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'))
            if (!target) return
            e.preventDefault()

            const start     = window.scrollY
            const end       = target.getBoundingClientRect().top + window.scrollY - 72
            const distance  = end - start
            const duration  = Math.min(Math.abs(distance) * 0.5, 900)  // max 900ms
            let startTime   = null

            function easeInOutCubic(t) {
                return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
            }

            function step(ts) {
                if (!startTime) startTime = ts
                const elapsed  = ts - startTime
                const progress = Math.min(elapsed / duration, 1)
                window.scrollTo(0, start + distance * easeInOutCubic(progress))
                if (progress < 1) requestAnimationFrame(step)
            }

            requestAnimationFrame(step)
        })
    })
}


// ── INIT ALL ──────────────────────────────────────────────────
;(function initEffects() {
    // Progress bar — immediate
    initScrollProgress()

    // Smooth scroll — immediate
    initSmoothScroll()

    // Everything else after DOM ready
    const run = () => {
        initHeroEntrance()
        initParticles()
        initScrollReveal()
        initCardTilt()
        initMagneticButtons()
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run)
    } else {
        run()
    }
})()