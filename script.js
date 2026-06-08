// Мобильное меню
const menuToggle = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Закрываем мобильное меню после клика
            if (mobileNav) mobileNav.classList.remove('active');
        }
    });
});

// Отправка формы в Google Sheets
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = {
            surname: document.getElementById('surname').value.trim(),
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value
        };
        
        // Проверка на пустые поля
        if (!data.surname || !data.name || !data.phone || !data.course) {
            alert('Заполните все поля');
            return;
        }
        
        const API_URL = 'https://script.google.com/macros/s/AKfycbyfRPE92vr2HCqm_sLoTXwUy57YqKnyaKRMXghGnoSLdJc2TA8Ih_cvclhbQh7QwAs/exec';
        
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        try {
            await fetch(API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            signupForm.reset();
        } catch (error) {
            console.error(error);
            alert('Ошибка отправки. Пожалуйста, позвоните нам по телефону.');
        } finally {
            submitBtn.textContent = 'Записаться';
            submitBtn.disabled = false;
        }
    });
}




// Горизонтальный скролл галереи
const scrollContainer = document.getElementById('gallery-scroll');
const scrollLeftBtn = document.getElementById('gallery-scroll-left');
const scrollRightBtn = document.getElementById('gallery-scroll-right');

if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 450; // ширина карточки

    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Лайтбокс
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const galleryItems = document.querySelectorAll('.gallery__item');

if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.getAttribute('data-full');
            lightboxImg.src = fullSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}