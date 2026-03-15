document.addEventListener('DOMContentLoaded', () => {
    const btn     = document.getElementById('menu-btn');
    const menu    = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const links   = document.querySelectorAll('.mobile-link');

    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }

    btn.addEventListener('click', () => {
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    links.forEach(link => link.addEventListener('click', closeMenu));
});
