function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.kebab-icon')) {
        const menus = document.getElementsByClassName("menu-list");
        for (let i = 0; i < menus.length; i++) {
            const openMenu = menus[i];
            if (openMenu.classList.contains('show')) {
                openMenu.classList.remove('show');
            }
        }
    }
}

