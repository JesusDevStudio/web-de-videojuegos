// Espera a que el contenido del documento HTML se haya cargado completamente antes de ejecutar el código
/*document.addEventListener('DOMContentLoaded', function () {
    // Obtiene la URL actual del navegador
    const urlLocation = window.location.href;

    // Verifica si la URL actual incluye "contacto.html"
    if (urlLocation.includes("contacto.html")) {
        // Encuentra el enlace actual que apunta a "contacto.html"
        const currentLink = document.querySelector('a[href="contacto.html"]');
        
        // Verifica si se encontró el enlace actual
        if (currentLink) {
            // Cambia el color del enlace actual a "pink" (rosa)
            currentLink.style.color = 'red';
        }
    }
});*/


/*_________________________________________________Ruta_dinamica_______________________________________________________*/

document.addEventListener('DOMContentLoaded', function () {
    const urlLocation = window.location.href;
    if (!urlLocation.includes("contacto.html")) {
        return;
    }

    /*const currentLink = document.querySelector('a[href="contacto.html"]');
    if (currentLink) {
        currentLink.style.color = 'red';
    }*/

    const map = L.map('map').setView([41.393054, 2.145468], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Configuración de Leaflet Routing Machine con el geocodificador
    const routingControl = L.Routing.control({
        waypoints: [
            L.latLng(41.393054, 2.145468),
            /*L.latLng(41.393014, 2.145754)*/ // segunda ruta por defecto
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        createMarker: function(i, waypoint) {
            const markerOptions = {
                draggable: true
            };
            const marker = L.marker(waypoint.latLng, markerOptions);

            if (i === 1) { // Si es el segundo waypoint entonces nos mostrara el mensaje
                marker.bindPopup('¡Estás aquí!').openPopup();
                map.once('layeradd', () => marker.openPopup());
            }
            return marker;
        }
    }).addTo(map);

    const marker = L.marker([41.393054, 2.145468]).addTo(map)
    .bindPopup('<b>Hola!</b><br />¡Barcelona, aquí estoy!').openPopup();

    map.on('click', function (e) {
        routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 1, e.latlng);
    });
});


