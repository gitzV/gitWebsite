// Highlight active sidebar link on scroll
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 50 && rect.bottom >= 50) {
            sidebarLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`.sidebar ul li a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// Add CSS for active state
document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
        .sidebar ul li a.active {
            background-color: #007BFF;
            color: white;
        }
    </style>`
);
