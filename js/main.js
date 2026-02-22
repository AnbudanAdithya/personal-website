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
    "MBA Candidate",
    "Financial Modeler",
    "Data Analytics Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000; // Delay between current and next text
const typeTarget = document.getElementById("typewriter-text");

function type() {
    if (!typeTarget) return; // Prevent errors on other pages
    
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
});