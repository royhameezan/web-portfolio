document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Scroll Fade-In Observer
    const sections = document.querySelectorAll('.section');
    const observerOptions = { threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });

    // 3. Image Zoom Modal (Full Card & Profile Image Clickable)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.modal-close');

    // Make entire cards clickable
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.card-img, .travel-img');
            if (img) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('show');
            }
        });
    });

    // Make profile picture clickable
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', () => {
            modalImg.src = profileImg.src;
            modalImg.alt = profileImg.alt;
            modal.classList.add('show');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => modal.classList.remove('show'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
});