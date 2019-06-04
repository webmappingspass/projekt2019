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
}).addTo(karte); //sdfassd



//Fügt bmapgrau als Startkarte hinzu
kartenLayer.bmapgrau.addTo(karte);

//Implementierung Fullscreen Plugin
karte.addControl(new L.Control.Fullscreen());

//setzt karte auf aktuelle Geolocation
//Hier Problem, dass KArte immer wieder auf diese Position zurückspringt-> Lösung suchen
/*
karte.locate({
    setView: true,
    maxZoom: 16,
    watch: true,
});
*/

//Setzt Startposition
karte.setView([47.25, 11.416667], 4);

// Implementierung Minimap
new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true,
        minimized: true
    }
).addTo(karte);




const bundesländer = L.featureGroup();


var alle = L.geoJson(natura2000);

//Für jedes Bundesland wird eigene Variable und entsprechende Popups erstellt
//Burgenland
var Burgenland = L.geoJson(natura2000, {
            filter: function(feature, layer) {
            return feature.properties.BUNDESLAND == "Burgenland";
        }
}).addTo(bundesländer);
Burgenland.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Kärnten
var Kaernten = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Kaernten";
}
}).addTo(bundesländer);
Kaernten.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Niederösterreich
var Niederoesterreich = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Niederoesterreich";
}
}).addTo(bundesländer);
Niederoesterreich.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Oberösterreich
var Oberoesterreich = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Oberoesterreich";
}
}).addTo(bundesländer);
Oberoesterreich.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Salzburg
var Salzburg = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Salzburg";
}
}).addTo(bundesländer);
Salzburg.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Steiermark
var Steiermark = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Steiermark";
}
}).addTo(bundesländer);
Steiermark.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Tirol
var Tirol = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Tirol";
}
}).addTo(bundesländer);
Tirol.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Wien
var Wien = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Wien";
}
}).addTo(bundesländer);
Wien.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});

//Vorarlberg
var Vorarlberg = L.geoJson(natura2000, {
    filter: function(feature, layer) {
    return feature.properties.BUNDESLAND == "Vorarlberg";
}
}).addTo(bundesländer);
Vorarlberg.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});


bundesländer.addTo(karte);
karte.fitBounds(bundesländer.getBounds());

//Funktionen die ausgeführt werden wenn Button gedrückt wird
function funcBurgenland() {
    karte.addLayer(bundesländer)
};

function funcBurgenland() {
    karte.removeLayer(bundesländer)
    Burgenland.addTo(karte)
};

function funcKaernten() {
    karte.removeLayer(bundesländer)
    Kaernten.addTo(karte)
};

function funcNiederoesterreich() {
    karte.removeLayer(bundesländer)
    Niederoesterreich.addTo(karte)
};
function funcOberoesterreich() {
    karte.removeLayer(bundesländer)
    Oberoesterreich.addTo(karte)
};
function funcSalzburg() {
    karte.removeLayer(bundesländer)
    Salzburg.addTo(karte)
};
function funcSteiermark() {
    karte.removeLayer(bundesländer)
    Steiermark.addTo(karte)
};
function funcTirol() {
    karte.removeLayer(bundesländer)
    Tirol.addTo(karte)
};
function funcWien() {
    karte.removeLayer(bundesländer)
    Wien.addTo(karte)
};
function funcVorarlberg() {
    karte.removeLayer(bundesländer)
    Vorarlberg.addTo(karte)
};



/* Hier werden buttons aktiviert
$("#burgenland").click(function() {
    map.removeLayer(bundesländer)
    map.addLayer(burgenland)
    
});

/*
var layer= L.geoJson(natura2000, {
}).addTo(karte);



layer.bindPopup(function(lay){
    const props = lay.feature.properties;
    const info = `<h1> ${props.NAME}  </h1>
    <p> Bundesland: ${props.BUNDESLAND} <br>
    Fläche: ${props.flaeche/1000000} Quadratkilometer </p> <br>
    Info:   ${props.INFO ? props.INFO: "keine weitereführenden Informationen"  }  `
    return info;
});



/*
//eigenes layer für jedes Bundesland erstellen
var burgenland = L.featureGroup();
L.geoJson(natura2000, {
    if(properties.NAME= "Burgenland")
    }).addTo(burgenland);
burgenland.addTo(karte)
/*
burgenland.bindPopup(
    `<h1> Name ${properties.NAME} </h1>`  // wie muss der Pfad heißen??
    );
/*


/* Beispiel um Gebiete Anhand von Eigenschaften einzufärben
L.geoJSON(grenzen, {
    style: function(features) {
        switch (features.id) {
            case 'RNA_NATIONALPARK.80a0a831-a0c0-4439-8f80-904c08c7': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(karte);
/*

/*
//Versuch Punkte aus gebiete.js zu lesen
for (let sight of TAUERN){
    let piktogramm = L.icon({
        iconUrl: `icons/1.png`,
        iconSize : 40,
    });
    sightpin = L.marker(
        [sight.geometry.coordinates[0], sight.geometry.coordinates[1]], {
            icon:piktogramm
        }
    ).addTo(karte) 

    sightpin.bindPopup(
        `<p><b> ${sight.NAME}</b><p>`
    );
    }

    */