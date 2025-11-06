// Función para generar las cards a partir de un archivo JSON
function generarCardsDesdeJSON(rutaJSON) {
    fetch(rutaJSON)
        .then((response) => response.json())
        .then((data) => {
            const $container = document.getElementById("cards-container");
            $container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas cards

            data.forEach((juego) => {
                // Crear el elemento principal de la card
                const card = document.createElement("div");
                card.className = "card shadow-sm";
                card.style.width = "18rem";

                // Estructura interna de la card (idéntica a tu ejemplo)
                card.innerHTML = `
                <div class="card-position">
                    <p ><strong>#${juego.nro}</strong></p>
                </div>
                <img src="${juego.portada}" class="card-img-top" alt="${
                            juego.juego
                        }" />
                <div class="card-body">
                    <h5 class="card-title">${juego.juego}</h5>
                    <p class="card-text">${juego.descripcion}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Consola:</strong> ${
                        juego.consola
                    }</li>
                    <li class="list-group-item"><strong>Fecha:</strong> ${
                        juego.fecha_salida
                    }</li>
                    <li class="list-group-item">⭐ ${juego.valoracion_media.toFixed(
                        1
                    )}</li>
                </ul>
        `;

                // Agregar la card al contenedor
                $container.appendChild(card);
            });
        })
        .catch((error) => console.error("Error al cargar el JSON:", error));
}

// llama funcion cuando el DOM esta listo
document.addEventListener("DOMContentLoaded", () => {
    generarCardsDesdeJSON("../juegos.json");
});


// Función para desplazarse hacia arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Mavegacion entre Home y Contacto
document.addEventListener("DOMContentLoaded", () => {
    const homeDiv = document.querySelector(".home-main");
    if (!homeDiv) return;
    const container = homeDiv.parentElement; // el contenedor donde está .home-main
    let originalHTML = container.innerHTML;

    async function loadContacto() {
        try {
            const res = await fetch("contacto.html");
            const text = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            const contact = doc.querySelector(".contact");
            if (!contact) {
                console.error("No se encontró .contact en contacto.html");
                return;
            }
            container.innerHTML = "";
            container.appendChild(document.importNode(contact, true));
            scrollToTop();
        } catch (err) {
            console.error("Error cargando contacto.html:", err);
        }
    }

    function restoreHome() {
        container.innerHTML = originalHTML;
        // Si el contenedor de cards está en el HTML restaurado, volver a generarlas
        const cardsContainer = container.querySelector("#cards-container");
        if (cardsContainer) {
            generarCardsDesdeJSON("../juegos.json");
        }
        scrollToTop();
    }

    document.querySelectorAll("nav a").forEach((a) => {
        a.addEventListener("click", (e) => {
            const txt = (a.textContent || "").trim().toLowerCase();
            if (txt === "contacto") {
                e.preventDefault();
                loadContacto();
            } else if (txt === "home") {
                e.preventDefault();
                restoreHome();
            }
        });
    });
});

// Navegacion activa en nav
document.addEventListener("DOMContentLoaded", () => {
    const navAnchors = document.querySelectorAll('li.nav-item > a');

    function clearAct() {
        navAnchors.forEach((a) => a.classList.remove("act"));
    }

    navAnchors.forEach((a) => {
        a.addEventListener("click", (e) => {
            if (a.classList.contains("act")) {
                a.classList.remove("act");
            } else {
                clearAct();
                a.classList.add("act");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    function attachReloadButtons(root = document) {
        root.querySelectorAll(".btn-secondary, .btn-close").forEach((btn) => {
            btn.addEventListener("click", () => {
                // permitir que cualquier cierre de modal ocurra y luego recargar
                setTimeout(() => location.reload(), 0);
            });
        });
    }

    attachReloadButtons();

    // Re-atachar si se insertan elementos dinámicamente (ej. carga de contacto.html)
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.addedNodes.length) {
                m.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) attachReloadButtons(node);
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
