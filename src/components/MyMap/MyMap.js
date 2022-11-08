import React, { useEffect, useState } from 'react';
///leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'


import { Col, Row } from 'react-bootstrap';
import Nav from '../Nav/Nav';
import Header from '../header/Header';
import ProjetService from '../Projet/Projet.service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const center = { lat: -18.865447, lng: 47.519533 }


const MyMap = () => {
    const [position, setPosition] = useState(center);

    const [projet, setprojet] = useState();
    const navigate = useNavigate();

    //function
    const getTache = (id) => {
        navigate(`/tachesById/${id}`);
    }


    useEffect(() => {

        ProjetService.getAll()
            .then(rep => {
                console.log('getAllProject', rep);
                setprojet(rep.data);
            })
            .catch(err => {
                console.log('errrrr', err);
            })
    }, [])


    return (
        <div style={{ overflow: 'hidden' }}>
            <Row className='container-fluid'>
                {/* ///////////////////////component include NAVIGATION */}
                <Col sm={2}>
                    <Nav></Nav>
                </Col>
                {/* /////////////////CONTAINER */}
                <Col sm={10} className={'container'}>
                    <Row>
                        <Header></Header>
                    </Row>





                    <Row>
                        <Col sm={12} className="boxMain">
                            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    projet ? (
                                        projet.map(pro => {
                                            return (
                                                <Marker position={[pro.latitude, pro.longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                                    {/* <Marker position={[pro.longitude, pro.latitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}> */}
                                                    <Popup minWidth={90}>
                                                        <h1>{pro.titre}</h1>
                                                        <p>Debut:{moment(pro.debut).format('dd/mm/yyyy')}</p>
                                                        <p>Fin:{moment(pro.fin).format('dd/mm/yyyy')}</p>
                                                        <p onClick={() => getTache(pro.id)}> Voir les taches</p>
                                                    </Popup>
                                                </Marker>
                                            )

                                        })
                                    ) : (<p>miandry</p>)
                                }
                            </MapContainer>
                        </Col>
                    </Row>

                </Col>

            </Row >
        </div >
    )
}

export default MyMap;
