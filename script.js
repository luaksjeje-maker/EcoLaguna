// Coordenadas de inicio (Entrada de la Laguna Chica, San Pedro de la Paz)
// Coordenadas exactas del acceso a la Laguna Chica (Balneario Municipal)
const ENTRADA_LAGUNA_CHICA = [-36.8407, -73.1018];

// Inicializar mapa
const map = L.map('map').setView(ENTRADA_LAGUNA_CHICA, 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Icono o marcador de inicio
const inicioMarker = L.marker(ENTRADA_LAGUNA_CHICA).addTo(map)
    .bindPopup('<b>📍 Entrada Laguna Chica</b><br>Punto de partida de la ruta.')
    .openPopup();

// Datos de lugares dentro/alrededor de la Laguna Chica
const lugares = [
    {
        nombre: "Balneario Municipal Laguna Chica",
        tipo: "limpio",
        coords: [-36.8412, -73.1015],
        desc: "Zona principal de playa y punto limpio para plásticos."
    },
    {
        nombre: "Club de Regatas San Pedro",
        tipo: "limpio",
        coords: [-36.8420, -73.1025],
        desc: "Contenedores para reciclaje de botellas y latas."
    },
    {
        nombre: "Acceso Principal y Estacionamiento",
        tipo: "basurero",
        coords: [-36.8405, -73.1020],
        desc: "Basureros generales en la zona de ingreso."
    },
    {
        nombre: "Paseo Costanera Laguna Chica",
        tipo: "basurero",
        coords: [-36.8418, -73.1008],
        desc: "Puntos de basura a lo largo del sendero peatonal."
    }
];

// Capas de filtros
const capaLimpios = L.layerGroup().addTo(map);
const capaBasureros = L.layerGroup().addTo(map);

const listaContainer = document.getElementById('lista-lugares');
if (listaContainer) listaContainer.innerHTML = '';

let rutaActual = null;

// Cargar marcadores y lista lateral
lugares.forEach(lugar => {
    const esLimpio = lugar.tipo === "limpio";
    const iconoTexto = esLimpio ? "🔵" : "🗑️";
    const capa = esLimpio ? capaLimpios : capaBasureros;

    // Crear marcador en el mapa
    const marker = L.marker(lugar.coords)
        .bindPopup(`<b>${iconoTexto} ${lugar.nombre}</b><br>${lugar.desc}`);
    
    capa.addLayer(marker);

    // Crear elemento en el menú lateral con botón de ruta
    if (listaContainer) {
        const item = document.createElement('div');
        item.className = 'lugar-item';
        item.style.marginBottom = '12px';
        item.style.padding = '8px';
        item.style.background = '#f4f4f4';
        item.style.borderRadius = '6px';

        item.innerHTML = `
            <strong>${iconoTexto} ${lugar.nombre}</strong>
            <p style="margin: 4px 0; font-size: 13px; color: #555;">${lugar.desc}</p>
            <button onclick="trazarRuta(${lugar.coords[0]}, ${lugar.coords[1]}, '${lugar.nombre}')" 
                    style="background:#087f5b; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:12px;">
                📍 Ver referencia en el mapa
            </button>
        `;
        listaContainer.appendChild(item);
    }
});

// Función para centrar y marcar la línea desde la entrada
window.trazarRuta = function(lat, lng, nombre) {
    if (rutaActual) map.removeLayer(rutaActual);

    // Dibuja una línea discontinua desde la entrada hasta el lugar seleccionado
    rutaActual = L.polyline([ENTRADA_LAGUNA_CHICA, [lat, lng]], {
        color: '#087f5b',
        weight: 4,
        dashArray: '6, 8'
    }).addTo(map);

    map.fitBounds([ENTRADA_LAGUNA_CHICA, [lat, lng]], { padding: [50, 50] });
};

// Filtros Checkbox
document.getElementById('limpios')?.addEventListener('change', e => {
    if (e.target.checked) map.addLayer(capaLimpios);
    else map.removeLayer(capaLimpios);
});

document.getElementById('basureros')?.addEventListener('change', e => {
    if (e.target.checked) map.addLayer(capaBasureros);
    else map.removeLayer(capaBasureros);
});