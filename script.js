// Coordenadas de inicio (Entrada de la Laguna Chica, San Pedro de la Paz)
const ENTRADA_LAGUNA_CHICA = [-36.8402, -73.1025];

// Inicializar el mapa centrado en la Laguna Chica
const map = L.map('map').setView(ENTRADA_LAGUNA_CHICA, 16);

// Cargar la capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marcador de la Entrada / Punto de Referencia
L.marker(ENTRADA_LAGUNA_CHICA)
    .addTo(map)
    .bindPopup('<b>📍 Entrada Laguna Chica</b><br>Punto de partida de la ruta.')
    .openPopup();

// Puntos de ejemplo alrededor de la Laguna Chica
const puntosLimpios = [
    { nombre: "Punto Limpio Balneario", coords: [-36.8395, -73.1018] },
    { nombre: "Reciclaje Plásticos Club de Regatas", coords: [-36.8410, -73.1030] }
];

const basureros = [
    { nombre: "Basurero Acceso Principal", coords: [-36.8400, -73.1022] },
    { nombre: "Basurero Costanera", coords: [-36.8408, -73.1015] }
];

// Capas para poder filtrar
const capaLimpios = L.layerGroup().addTo(map);
const capaBasureros = L.layerGroup().addTo(map);

puntosLimpios.forEach(p => {
    L.marker(p.coords).bindPopup(`<b>🔵 ${p.nombre}</b>`).addTo(capaLimpios);
});

basureros.forEach(b => {
    L.marker(b.coords).bindPopup(`<b>🗑️ ${b.nombre}</b>`).addTo(capaBasureros);
});

// Control de Filtros (Checkbox)
document.getElementById('limpios').addEventListener('change', function(e) {
    if (e.target.checked) map.addLayer(capaLimpios);
    else map.removeLayer(capaLimpios);
});

document.getElementById('basureros').addEventListener('change', function(e) {
    if (e.target.checked) map.addLayer(capaBasureros);
    else map.removeLayer(capaBasureros);
});