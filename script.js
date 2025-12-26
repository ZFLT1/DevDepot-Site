// Dark/Light Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// التحقق من الوضع المحفوظ
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// تبديل الوضع
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Discord Join Function
function joinDiscord() {
    window.open('https://discord.gg/PmRvMVPzRG', '_blank');
    
    // SweetAlert2 Notification (اختياري)
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'انضمام إلى الديسكورد',
            text: 'سيتم فتح سيرفر الديسكورد في نافذة جديدة. مرحباً بك!',
            icon: 'success',
            confirmButtonText: 'تم',
            timer: 3000,
            timerProgressBar: true
        });
    }
}

// Download App Function
function downloadApp() {
    alert('ديبووت قيد التطوير سيتم اصداره قريباً. شكراً لثقتك!');
    // رابط التحميل الفعلي يمكن إضافته هنا
    // window.location.href = 'path/to/app.apk';
}

// Slideshow Auto Rotation
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showNextSlide() {
        // إخفاء الشريحة الحالية
        slides[currentSlide].classList.remove('active');
        
        // الانتقال للشريحة التالية
        currentSlide = (currentSlide + 1) % slides.length;
        
        // إظهار الشريحة الجديدة
        slides[currentSlide].classList.add('active');
    }
    
    // تبديل كل 5 ثواني
    setInterval(showNextSlide, 5000);
    
    // بدء الشريحة الأولى
    slides[0].classList.add('active');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    
    // Add active class to current page in nav
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((linkHref === currentPage) || 
            (linkHref === 'index.html' && currentPage === '') ||
            (linkHref === '#' && currentPage === '')) {
            link.classList.add('active');
        }
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Form Validation for Contact Page
if (document.querySelector('.contact-form')) {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // هنا يمكنك إرسال البيانات إلى السيرفر
        console.log('تم إرسال النموذج:', { name, email, message });
        
        // SweetAlert2 Success Message
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'تم الإرسال بنجاح!',
                text: 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.',
                icon: 'success',
                confirmButtonText: 'تم'
            });
        } else {
            alert('شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.');
        }
        
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Countdown Timer for countdown.html
if (document.querySelector('.countdown-timer')) {
    function updateCountdown() {
        const targetDate = new Date('2026-01-20T23:59:59').getTime();

        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            document.querySelector('.countdown-timer').innerHTML = 
                '<div class="countdown-over">لقد وصلنا! 🎉</div>';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // تحديث كل ثانية
    setInterval(updateCountdown, 1000);
    updateCountdown(); // التشغيل الأولي
}
