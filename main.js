// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter gallery items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animate statistics counter on Impact page
    const downloadsCount = document.getElementById('downloads-count');
    if (downloadsCount) {
        animateCounter(downloadsCount, 0, 1000, 2000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle (could be expanded)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    const nav = document.querySelector('nav');
    nav.prepend(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function() {
        const ul = document.querySelector('nav ul');
        ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    });

    // Check screen size and adjust menu
    function checkScreenSize() {
        const ul = document.querySelector('nav ul');
        if (window.innerWidth > 768) {
            ul.style.display = 'flex';
        } else {
            ul.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});

// Counter animation function
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Video play/pause on hover for gallery
const videoItems = document.querySelectorAll('.video-item video');
videoItems.forEach(video => {
    video.addEventListener('mouseover', function() {
        this.play();
    });
    
    video.addEventListener('mouseout', function() {
        this.pause();
        this.currentTime = 0;
    });
});

// Star rating interaction for reviews page
const starsContainers = document.querySelectorAll('.stars');
starsContainers.forEach(container => {
    if (container.id !== 'overall-stars') {
        container.addEventListener('click', function(e) {
            const stars = this.querySelectorAll('span');
            const clickedIndex = Array.from(stars).indexOf(e.target);
            
            stars.forEach((star, index) => {
                if (index <= clickedIndex) {
                    star.textContent = '★';
                } else {
                    star.textContent = '☆';
                }
            });
        });
        
        // Convert stars to clickable spans
        const starsText = this.textContent;
        this.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = i < parseInt(starsText) ? '★' : '☆';
            star.style.cursor = 'pointer';
            this.appendChild(star);
        }
    }
});