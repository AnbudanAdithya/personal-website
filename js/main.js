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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (
            (currentPage === 'index.html' && (href.endsWith('index.html') || href === './')) ||
            (currentPage !== 'index.html' && href.includes(currentPage))
        ) {
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