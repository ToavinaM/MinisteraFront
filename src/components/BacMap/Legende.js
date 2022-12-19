import React from 'react'
import { useEffect } from 'react';
import L from 'leaflet';
import './styles.css';
export default function Legende({ map }) {

    useEffect(() => {
        if (map) {
            alert('map');
            const legend = L.control({ position: "bottomright" });

            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info legend");
                div.innerHTML =
                    "<h4>This is the legend</h4>" +
                    "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
                return div;
            };

            legend.addTo(map);
        }
    }, [map]); //here add map
    return null;

}
