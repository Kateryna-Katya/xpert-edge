document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Плавное изменение фона хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(5, 5, 7, 0.9)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'transparent';
        }
    });

    // Анимация логотипа (микродвижение точки)
    gsap.to('.logo-dot', {
        scale: 1.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

  // Интерактив для Hero (движение мыши за сферой)
document.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.orb');
    if (!orb) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Мягкое смещение сферы в зависимости от положения курсора
    orb.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
});

// Дополнительная валидация: появление элементов при скролле (через Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Применяем ко всем секциям, которые создадим дальше
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
    // Интерактивный свет на карточках (движение за мышью внутри карточки)
document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Обновим lucide для новых иконок
lucide.createIcons();
});