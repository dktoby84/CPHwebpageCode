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

function switchLanguage(language) {
  const currentPath = window.location.pathname;
  let newPath = currentPath;

  if (language === 'da') {
    newPath = newPath.replace('/en/', '/da/');
  } else if (language === 'en') {
    newPath = newPath.replace('/da/', '/en/');
  }

  window.location.href = newPath;
}
