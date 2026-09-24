// ================================
// EcoLaguna - Mapa de reciclaje
// ================================

// Crear mapa
var map = L.map('map').setView([-36.8406, -73.0867], 14);

// Mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// ================================
// ICONOS GRANDES
// ================================

var iconoReciclaje = L.divIcon({
    className: 'marcador-reciclaje',
    html: '<div class="icono-grande">♻️</div>',
    iconSize: [56, 56],
    iconAnchor: [28, 28]
});

var iconoLimpio = L.divIcon({
    className: 'marcador-limpio',
    html: '<div class="icono-grande">🔵</div>',
    iconSize: [56, 56],
    iconAnchor: [28, 28]
});

var iconoBasurero = L.divIcon({
    className: 'marcador-basurero',
    html: '<div class="icono-grande">🗑️</div>',
    iconSize: [56, 56],
    iconAnchor: [28, 28]
});


// ================================
// GRUPOS DE MARCADORES
// ================================

var grupoReciclaje = L.layerGroup().addTo(map);
var grupoLimpios = L.layerGroup().addTo(map);
var grupoBasureros = L.layerGroup().addTo(map);


// ================================
// LUGARES DE RECICLAJE
// ================================

// Punto de reciclaje municipal
var puntoMunicipal = L.marker(
    [-36.8406, -73.0867],
    { icon: iconoReciclaje }
).addTo(grupoReciclaje);

puntoMunicipal.bindPopup(`
    <div class="popup-titulo">
        ♻️ Punto de Reciclaje Municipalidad
    </div>

    <b>Dirección:</b><br>
    Los Nogales 155, San Pedro de la Paz

    <br><br>

    <div class="popup-coordenadas">
        Coordenadas del mapa: próximamente
    </div>
`);


// Punto Limpio & Reciclaje
var puntoTorres = L.marker(
    [-36.8430, -73.0940],
    { icon: iconoLimpio }
).addTo(grupoLimpios);

puntoTorres.bindPopup(`
    <div class="popup-titulo">
        🔵 Punto Limpio & Reciclaje
    </div>

    <b>Dirección:</b><br>
    Av. Par Vial Las Torres, San Pedro de la Paz

    <br><br>

    <div class="popup-coordenadas">
        Punto de reciclaje registrado en la comuna.
    </div>
`);


// Centro de Reciclaje EcoChile
var ecoChile = L.marker(
    [-36.8310, -73.1010],
    { icon: iconoReciclaje }
).addTo(grupoReciclaje);

ecoChile.bindPopup(`
    <div class="popup-titulo">
        ♻️ Centro de Reciclaje EcoChile
    </div>

    <b>Dirección:</b><br>
    Sector Industrial Los Batros,
    Pasaje Daniel Belmar interior 180

    <br><br>

    <div class="popup-coordenadas">
        San Pedro de la Paz
    </div>
`);


// ================================
// LISTA LATERAL
// ================================

var lista = document.getElementById('lista-lugares');

lista.innerHTML = `
    <div class="lugar">
        <strong>♻️ Punto de Reciclaje Municipalidad</strong>
        <span class="coordenadas">
            Los Nogales 155
        </span>
    </div>

    <div class="lugar">
        <strong>🔵 Punto Limpio & Reciclaje</strong>
        <span class="coordenadas">
            Av. Par Vial Las Torres
        </span>
    </div>

    <div class="lugar">
        <strong>♻️ Centro de Reciclaje EcoChile</strong>
        <span class="coordenadas">
            Sector Industrial Los Batros
        </span>
    </div>
`;


// ================================
// MOSTRAR / OCULTAR CAPAS
// ================================

document.getElementById('reciclaje').addEventListener('change', function () {

    if (this.checked) {
        map.addLayer(grupoReciclaje);
    } else {
        map.removeLayer(grupoReciclaje);
    }

});


document.getElementById('limpios').addEventListener('change', function () {

    if (this.checked) {
        map.addLayer(grupoLimpios);
    } else {
        map.removeLayer(grupoLimpios);
    }

});


document.getElementById('basureros').addEventListener('change', function () {

    if (this.checked) {
        map.addLayer(grupoBasureros);
    } else {
        map.removeLayer(grupoBasureros);
    }

});
function mostrarRuta() {
    map.setView([-36.845, -73.1086], 16);

    L.popup()
        .setLatLng([-36.845, -73.1086])
        .setContent(`
            <div class="popup-titulo">
                📍 Sector Anfiteatro
            </div>

            <p>
                Referencia del sector de Laguna Grande
                donde se encuentra un punto limpio.
            </p>

            <div class="popup-coordenadas">
                Coordenadas: -36.8450, -73.1086
            </div>
        `)
        .openOn(map);
}