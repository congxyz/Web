async function loadComponent(selector, path) {
    const container = document.querySelector(selector);

    if (!container) return;

    const response = await fetch(path);
    const html = await response.text();

    container.innerHTML = html;

    if (window.lucide) {
        lucide.createIcons();
    }
}