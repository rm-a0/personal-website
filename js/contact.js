document.addEventListener('DOMContentLoaded', () => {
    // Email obfuscation — replace with your actual parts
    const user   = 'your.email';
    const domain = 'example.com';
    const link = document.getElementById('mail-link');
    if (link) link.href = `mailto:${user}@${domain}`;

    // Last updated
    const el = document.getElementById('last-updated');
    if (el) {
        const d = new Date(document.lastModified);
        const formatted = d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
        el.textContent = `last updated: ${formatted}`;
    }
});
