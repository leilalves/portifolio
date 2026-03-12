const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

const navLinks = document.querySelectorAll('.navlist a');

function activeLink() {
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

navLinks.forEach(item => item.addEventListener('click', activeLink));

function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light');

    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    updateTextColor();
    updateImage();
}

function updateImage () {
const img = document.getElementById('img1');
const isLight = document.documentElement.classList.contains('light');

img.src = isLight ? './img/computer2.jpg' : './img/computer.jpg';
}


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}
updateImage();

const titleElement = document.querySelector('#name');
const text = "Leila Rocha";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

function animateText() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1);
            index++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1);
        index--;
        } else {
            isTyping = true;
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#C41E3D' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);
}

function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}, 100);

const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

    if (index !== 0) {
        if (index === 1) section.style.transform = 'translateY(100px)';
        else if (index === 2) section.style.transform = 'scale(0.8)';
        else if (index === 3) section.style.transform = 'rotateY(90deg)';
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

sections.forEach((section) => observer.observe(section));

document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(slideIndex) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    if (slideIndex < 0) currentSlide = slides.length - 1;
    else if (slideIndex >= slides.length) currentSlide = 0;
    else currentSlide = slideIndex;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth})px`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

carouselSlides.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block';

    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json'}
    })

    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000);
        } else {
            alert('Erro ao enviar formulário. Tente novamente');
        }
    })
    .catch(() => alert('Erro na conexão. Tente novamente.'));
});

const aboutSection = document.querySelector('.about');

function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible');
        window.removeEventListener('scroll', checkAboutVisibility);
    }
}

window.addEventListener('scroll', checkAboutVisibility);

checkAboutVisibility();