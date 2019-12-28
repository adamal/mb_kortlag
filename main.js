mapboxgl.accessToken = 'pk.eyJ1IjoiYWFsYXNzbyIsImEiOiJjajZtM3h1NHAxdHoyMnFvMXhzNGlybjNpIn0.y93JQjea9qsYKax-JYJwqA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: [11, 56], // starting position [lng, lat]
    zoom: 6, // starting zoom
    hash: true // sync map zoom/center to/from url
});


// disable map rotation using right click + drag
map.dragRotate.disable();
 
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

map.on('load', function () {
    map.addLayer(
        {
            'id': 'matrikler',
            'type': 'raster',
            'source': {
                'type': 'raster',
                'tiles': [
                    'https://services.kortforsyningen.dk/service?token=cbf4f1b233e56fc37637cee2721ca9a8&styles=Roede_Jordstykker&servicename=mat&LAYERS=Jordstykke&TRANSPARENT=TRUE&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
                ],
                'tileSize': 256
            },
            'paint': { 'raster-opacity': 0.4 },
            'style': {
                'opacity': 0.2
            },
            'layout': {
                'visibility': 'visible'
            }
        }
    );
});


// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), 
    'bottom-right'
);

// from mapbox toggle layers example
var toggleableLayerIds = ['matrikler'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}