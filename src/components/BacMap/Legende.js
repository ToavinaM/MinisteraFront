import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

import { useRef } from "react";

const Legende = ({ labelEtatBac, effectif }) => {
  const map = useMap();
  const legend = L.control({ position: "topright" });

    useEffect(() => {
    
        
        if(effectif){
            map.removeControl(legend,3);
            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info");
                let labels = [];
                for (let statut of labelEtatBac) {
                    labels.push(
                        `<b>  
                        <img class="iconLegende" src='./img/${statut.id}.png' />
                        ${statut.labele} : ${effectif[statut.id]}
                        </b>`
                        );
                    }
                    delete labels[0];
                    div.innerHTML = labels.join("<br>");
                    return div;
                };
                legend.addTo(map);
        }
    }, [effectif]);
};


export default Legende;
