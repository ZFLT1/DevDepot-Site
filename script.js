// --- 1. Dark/Light Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// --- 2. Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// --- 3. Countdown Timer (Target: Jan 20, 2026) ---
function updateCountdown() {
    const targetDate = new Date('January 20, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const daysEl = document.getElementById('days');
    if (!daysEl) return; // تأكد أننا في صفحة العداد

    if (timeLeft <= 0) {
        document.querySelector('.countdown-display').innerHTML = "🚀 انطلقنا!";
        return;
    }

    const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = d.toString().padStart(2, '0');
    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
}

// تشغيل العداد
if (document.getElementById('days')) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// --- 4. Pulse Animation Effect ---
setInterval(() => {
    const items = document.querySelectorAll('.countdown-item');
    items.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('pulse');
            setTimeout(() => item.classList.remove('pulse'), 500);
        }, i * 200);
    });
}, 5000);
