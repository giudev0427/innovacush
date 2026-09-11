/* ==========================================================================
   INNOVACUSH — Interacciones principales (JavaScript Vanilla)
   - Generación de enlaces de WhatsApp y redes sociales
   - Menú móvil (hamburguesa)
   - Header con sombra al hacer scroll
   - Animación de aparición con IntersectionObserver
   ========================================================================== */

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/people/InnovaCush/61594480100135/",
  instagram: "https://www.instagram.com/innovacush/",
  tiktok: "https://www.tiktok.com/@innovacush8"
};

const WHATSAPP_NUMBER = "51925453134";

/* --------------------------- Enlaces de redes --------------------------- */
document.querySelectorAll("[data-social]").forEach(function (anchor) {
  const red = anchor.getAttribute("data-social");
  if (SOCIAL_LINKS[red]) {
    anchor.setAttribute("href", SOCIAL_LINKS[red]);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  }
});

/* --------------------------- Enlaces de WhatsApp ------------------------ */
function waLink(mensaje) {
  const texto = encodeURIComponent(mensaje || "Hola INNOVACUSH, quiero hacer un pedido.");
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + texto;
}

document.querySelectorAll("[data-wa]").forEach(function (anchor) {
  const mensaje = anchor.getAttribute("data-wa") || "Hola INNOVACUSH, quiero hacer un pedido.";
  anchor.setAttribute("href", waLink(mensaje));
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
});

/* ------------------------------ Menú móvil ------------------------------ */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

function toggleMenu(abierto) {
  const isOpen = abierto !== undefined ? abierto : !nav.classList.contains("nav--open");
  nav.classList.toggle("nav--open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

if (hamburger && nav) {
  hamburger.addEventListener("click", function () {
    toggleMenu();
  });

  // Cerrar al elegir una opción del menú
  nav.querySelectorAll("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      toggleMenu(false);
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener("click", function (event) {
    if (
      nav.classList.contains("nav--open") &&
      !nav.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // Cerrar al presionar Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      toggleMenu(false);
    }
  });
}

/* -------------------- Header con sombra al hacer scroll ----------------- */
const header = document.getElementById("header");

function onScrollHeader() {
  if (window.scrollY > 8) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
}

window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

/* ------------------- Aparición de elementos al hacer scroll ------------- */
const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in-view");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementosReveal.forEach(function (el) {
    observador.observe(el);
  });
} else {
  // Respaldo: mostrar todo si no hay soporte
  elementosReveal.forEach(function (el) {
    el.classList.add("in-view");
  });
}

/* ------------------- Enlace activo del menú al hacer scroll ------------- */
const secciones = document.querySelectorAll("main section[id]");
const enlacesNav = document.querySelectorAll(".nav__list a[href^='#']");

function resaltarEnlaceActivo() {
  const posicion = window.scrollY + (window.innerHeight * 0.35);
  let idActual = "";

  secciones.forEach(function (seccion) {
    if (posicion >= seccion.offsetTop) {
      idActual = seccion.getAttribute("id");
    }
  });

  enlacesNav.forEach(function (enlace) {
    enlace.classList.toggle("activo", enlace.getAttribute("href") === "#" + idActual);
  });
}

window.addEventListener("scroll", resaltarEnlaceActivo, { passive: true });
resaltarEnlaceActivo();