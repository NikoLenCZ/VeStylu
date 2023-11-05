const menu = document.querySelector(".navbar-icon");
const navList = document.querySelector(".nav-list");
const openMenu = document.querySelector(".icofont-navigation-menu");
const closeMenu = document.querySelector(".icofont-close");

openMenu.onclick = function() {
  navList.classList.toggle("show");
  openMenu.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
};

closeMenu.onclick = function() {
  navList.classList.toggle("show");
  closeMenu.classList.toggle("hidden");
  openMenu.classList.toggle("hidden");
};

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach( navLink => {
  navLink.addEventListener("click", () => {
    navList.classList.toggle("show");
    closeMenu.classList.toggle("hidden");
    openMenu.classList.toggle("hidden");
  })
})