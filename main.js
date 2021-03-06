let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

//Auswahl für die Karten
const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte); 

//Fügt bmapgrau als Startkarte hinzu
kartenLayer.bmapgrau.addTo(karte);

//Implementierung Fullscreen Plugin
karte.addControl(new L.Control.Fullscreen());

//Setzt Startposition
karte.setView([47.248, 13.820], 6);

// Minimap
new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true,
        minimized: true
    }
).addTo(karte);

//definiert LayerGroup zu der später alle bundeslaender hinzugefügt werden
const bundeslaender = L.layerGroup();

//Style Optionen für die Polygone
var myStyle = {
    fillColor: '#4CAF50',
    fillOpacity: 0.6,
    weight: 1,
    color: 'green',
    opacity: 1,   
};

//Für jedes Bundesland wird eigene Variable und entsprechende Popups erstellt
//Burgenland
var Burgenland;
Burgenland = L.geoJson(natura2000, {
            
            filter: function(feature, layer) {
            return feature.properties.BUNDESLAND == "Burgenland";
            
        },
        style: myStyle
}).addTo(bundeslaender);
Burgenland.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   <a href= "${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }">Link </a>  `
    return info;
});

//Kärnten
var Kaernten;
Kaernten = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Kaernten";
},
style: myStyle
}).addTo(bundeslaender);
Kaernten.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Niederösterreich
var Niederoesterreich;
Niederoesterreich = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Niederoesterreich";
},
style: myStyle
}).addTo(bundeslaender);
Niederoesterreich.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Oberösterreich
var Oberoesterreich;
Oberoesterreich = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Oberoesterreich";
},
style: myStyle
}).addTo(bundeslaender);
Oberoesterreich.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Salzburg
var Salzburg;
Salzburg = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Salzburg";
},
style: myStyle
}).addTo(bundeslaender);
Salzburg.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Steiermark
var Steiermark;
Steiermark = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Steiermark";
},
style: myStyle
}).addTo(bundeslaender);
Steiermark.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Tirol
var Tirol;
Tirol = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Tirol";
},
style: myStyle
}).addTo(bundeslaender);
Tirol.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   <a href= "${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }">Link </a>  `
    return info;
});

//Wien
var Wien;
Wien = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Wien";
},
style: myStyle
}).addTo(bundeslaender);
Wien.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:  ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Vorarlberg
var Vorarlberg;
Vorarlberg = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Vorarlberg";
},
style: myStyle
}).addTo(bundeslaender);
Vorarlberg.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${Math.round(props.flaeche/1000000)} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Alle Bundesländer werden zur Karte hinzugefügt
bundeslaender.addTo(karte);


//Plugin setzt Karte auf aktuelle GeoPosition, falls Ortung aktiviert
karte.locate({
    setView: true,
    maxZoom: 8,
    watch: true,
});

//Funktionen die ausgeführt werden wenn Button gedrückt wird
function funcAlle() {
    if(!karte.hasLayer(bundeslaender)){              
        bundeslaender.addTo(karte);
        }
    else{
        karte.removeLayer(bundeslaender);
    }
};

function funcBurgenland() {
    if(!karte.hasLayer(Burgenland)){              
    Burgenland.addTo(karte);
    }
    else{
        karte.removeLayer(Burgenland);
    }
};

function funcKaernten() {
    if(!karte.hasLayer(Kaernten)){              
        Kaernten.addTo(karte);
        }
    else{
        karte.removeLayer(Kaernten);           
    }
};

function funcNiederoesterreich() {
    if(!karte.hasLayer(Niederoesterreich)){              
        Niederoesterreich.addTo(karte);
        }
    else{
        karte.removeLayer(Niederoesterreich);           
    }
};
function funcOberoesterreich() {
    if(!karte.hasLayer(Oberoesterreich)){              
        Oberoesterreich.addTo(karte);
        }
    else{
        karte.removeLayer(Oberoesterreich);           
    }
};
function funcSalzburg() {
    if(!karte.hasLayer(Salzburg)){              
        Salzburg.addTo(karte);
        }
    else{
        karte.removeLayer(Salzburg);           
    }
};
function funcSteiermark() {
    if(!karte.hasLayer(Steiermark)){              
        Steiermark.addTo(karte);
        }
    else{
        karte.removeLayer(Steiermark);           
    }
};
function funcTirol() {
    if(!karte.hasLayer(Tirol)){              
        Tirol.addTo(karte);
        }
    else{
        karte.removeLayer(Tirol);           
    }
};
function funcWien() {
    if(!karte.hasLayer(Wien)){              
        Wien.addTo(karte);
        }
    else{
        karte.removeLayer(Wien);           
    }
};
function funcVorarlberg() {
    if(!karte.hasLayer(Vorarlberg)){              
        Vorarlberg.addTo(karte);
        }
    else{
        karte.removeLayer(Vorarlberg);           
    }
};

//Suchfeld
    const suchFeld = new L.Control.Search({
    layer: bundeslaender,
    propertyName: "NAME",
    zoom: 10,
    initial: false,
    });
    karte.addControl(suchFeld);

//Hash-Url
var hash = new L.Hash(karte);
