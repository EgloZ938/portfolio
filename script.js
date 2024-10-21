document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    function toggleMenu() {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    menuToggle.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollElements = document.querySelectorAll('.btn, .link-navbar');
    scrollElements.forEach(element => {
        element.addEventListener('click', smoothScroll);
    });

    const carousel = document.querySelector('.skills-carousel');
    const container = document.querySelector('.skills-carousel-container');
    
    // Configuration du carrousel
    const itemWidth = 165; // Largeur d'un élément + marge (150px + 15px)
    const displayCount = Math.ceil(container.offsetWidth / itemWidth);
    const totalItems = carousel.children.length;
    const cloneCount = displayCount;
    
    // Cloner les éléments nécessaires
    for (let i = 0; i < cloneCount; i++) {
        carousel.appendChild(carousel.children[i].cloneNode(true));
    }
    
    let position = 0;
    let speed = 0.4;
    
    function updateSpeed() {
        const baseSpeed = 0.4;
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 600) {
            speed = baseSpeed * 1.25;
        } else if (screenWidth < 1024) {
            speed = baseSpeed * 1.5;
        } else {
            speed = baseSpeed;
        }
    }
    
    function moveCarousel() {
        position -= speed;
        
        // Réinitialiser la position quand tous les éléments originaux sont passés
        if (position <= -totalItems * itemWidth) {
            position = 0;
        }
        
        carousel.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(moveCarousel);
    }
    
    // Mise à jour de la vitesse lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateSpeed);
    
    // Initialisation
    updateSpeed();
    moveCarousel();
    
    // Ajout des attributs ARIA pour l'accessibilité
    carousel.setAttribute('aria-label', 'Carrousel de compétences');
    Array.from(carousel.children).forEach((item, index) => {
        item.setAttribute('aria-roledescription', 'slide');
        item.setAttribute('aria-label', `Compétence ${index % totalItems + 1} sur ${totalItems}`);
    });
});