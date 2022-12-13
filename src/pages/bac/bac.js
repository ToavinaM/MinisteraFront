import React, { useEffect, useState } from 'react';
///leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import L from 'leaflet';

import { Col, Row } from 'react-bootstrap';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import ServiceBac from './service';

import ServiceProjet from '../../components/Projet/Projet.service';
import Legende from './Legende';

const centers = { lat: -18.865447, lng: 47.519533 }

function returnStatutBac(bac) {

}
// functiom returnDebordementPlein(bac) {

// }
const vert = new L.Icon({
    iconUrl: require('./img/vert.png'),
    // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    iconAnchor: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 25),
    // className: 'leaflet-div-icon'
});

const rouge = new L.Icon({
    iconUrl: require('./img/rouge.png'),
    // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    iconAnchor: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 25),
    // className: 'leaflet-div-icon'
});
const jaune = new L.Icon({
    iconUrl: require('./img/jaune.png'),
    // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    iconAnchor: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 25),
    // className: 'leaflet-div-icon'
});



const Bac = () => {
    const [position, setPosition] = useState(centers);
    const [bacs, setbac] = useState([]);
    const [map, setMap] = useState(null);



    function getColorBack(bac) {
        console.log('getColor', bac.etat_in_bac)
        if (bac.etat_in_bac === 5) {
            return jaune
        }
        if (bac.etat_in_bac < 5) {

            return jaune
        }
        if (bac.etat_in_bac > 5) {

            return jaune
        }
    }


    useEffect(() => {
        ServiceBac.getAllBac()
            .then(rep => {
                setbac(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }, [])
    console.log(bacs);
    return (
        <div style={{ overflow: 'hidden' }}>
            <Row className='container-fluid'>
                <Col sm={12}>
                    <Row>
                        {/* <Col sm={12} className="boxMain"> */}
                        <MapContainer whenCreated={setMap} center={centers} zoom={13} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                bacs.length > 0 && (
                                    bacs.map(bac => {
                                        const color = getColorBack(bac);
                                        return (
                                            <Marker
                                                icon={color}
                                                key={bac.localisation + 'mq'}
                                                position={
                                                    [parseFloat(bac.longitude), parseFloat(bac.latitude)]
                                                }
                                            >
                                                <Popup key={bac.localisation + 'dq'} minWidth={100}>
                                                    <p key={bac.localisation + 'q'}>localisation:{bac.localisation}</p>
                                                    <p key={bac.localisation + 'qw'}>date_signalement:{bac.date_signalement}</p>
                                                    <p key={bac.localisation + 'qe'}>heure_signalement:{bac.heure_signalement}</p>
                                                    <p key={bac.localisation + 'qr'}>etat_debordement:{bac.etat_debordement}</p>
                                                    <p key={bac.localisation + 'qt'}>etat_in_bac:{bac.etat_in_bac}</p>
                                                    <p key={bac.localisation + 'qy'}>latitude:{parseFloat(bac.latitude)}</p>
                                                    <p key={bac.localisation + 'qu'}>longitude:{parseFloat(bac.longitude)}</p>
                                                    <p key={bac.localisation + 'qi'}>nom_pc:{bac.nom_pc}</p>
                                                </Popup>
                                            </Marker>
                                        )
                                    })
                                )

                            }

                            <Legende map={map} />
                        </MapContainer>
                        {/* </Col> */}
                    </Row>

                </Col>

            </Row >
        </div >
    )
}

export default Bac;
