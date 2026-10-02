const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const menuLabel = document.querySelector(".menu-label");
const mobile = window.matchMedia("(max-width: 760px)");

function setMenu(open, returnFocus = false) {
  toggle.setAttribute("aria-expanded", String(open));
  header.classList.toggle("menu-is-open", open);
  menuLabel.textContent = open ? "Close menu" : "Open menu";
  if (returnFocus) toggle.focus();
}

toggle.hidden = false;
header.classList.add("navigation-ready");
toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    setMenu(false, true);
  }
});
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenu(false);
});
mobile.addEventListener("change", () => {
  const focusedElement = document.activeElement;
  const focusWillHide = mobile.matches
    ? navigation.contains(focusedElement)
    : focusedElement === toggle;
  setMenu(false);
  if (focusWillHide) {
    (mobile.matches ? toggle : navigation.querySelector("a")).focus();
  }
});
