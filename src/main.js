document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Мобильное меню
    const burger = document.querySelector('.burger');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = burger.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 50 ? 'rgba(5, 5, 7, 0.9)' : 'transparent';
        header.style.padding = window.scrollY > 50 ? '12px 0' : '20px 0';
    });

    // 4. Интерактив: Сфера в Hero и Spotlight в карточках
    const orb = document.querySelector('.orb');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        // Сфера
        if (orb) {
            const moveX = (clientX / window.innerWidth - 0.5) * 60;
            const moveY = (clientY / window.innerHeight - 0.5) * 60;
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        // Карточки
        document.querySelectorAll('.solution-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${clientX - rect.left}px`);
            card.style.setProperty('--y', `${clientY - rect.top}px`);
        });
    });

    // 5. Intersection Observer для анимаций появления
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        }, { threshold: 0.1 });
    });

    document.querySelectorAll('.adv-item, .blog-card').forEach(el => observer.observe(el));

    // 6. Форма и Капча
    let captchaRes;
    const genCaptcha = () => {
        const a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10);
        captchaRes = a + b;
        document.getElementById('captcha-question').innerText = `${a} + ${b} = ?`;
    };

    const form = document.getElementById('ai-form');
    if (form) {
        genCaptcha();
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const ans = document.getElementById('captcha-answer').value;
            if (parseInt(ans) !== captchaRes) {
                alert('Капча введена неверно');
                return genCaptcha();
            }
            form.querySelector('button').innerText = 'Отправка...';
            setTimeout(() => {
                form.style.display = 'none';
                document.getElementById('success-msg').style.display = 'flex';
            }, 1500);
        });
    }

    // 7. Cookie Popup
    const cookiePop = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('xpert_cookies')) {
        setTimeout(() => cookiePop.classList.add('visible'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('xpert_cookies', 'true');
        cookiePop.classList.remove('visible');
    });
});