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

// Llamás a la función cuando el DOM esté listo
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