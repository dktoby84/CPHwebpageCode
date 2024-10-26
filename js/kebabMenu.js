// Toggle the visibility of the menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

// Close the menu if the user clicks outside of it
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

function switchLanguage(lang) {
  if (lang === 'da') {
    window.location.href = 'index.html'; // Link to the Danish version
  } else if (lang === 'en') {
    window.location.href = 'index-en.html'; // Link to the English version
  }
}