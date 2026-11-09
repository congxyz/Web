(function () {

    currentPath = window.location.pathname;

    const items = document.querySelectorAll(".navigation a");

    items.forEach(item => {
        item.classList.remove("active");
        const path = item.getAttribute("href");
        if (currentPath === path) {
            item.classList.add("active");
        }
    });

})();