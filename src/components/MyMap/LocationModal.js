import React, { useState } from 'react';

import { Button, Col, Modal, Row } from 'react-bootstrap';
//leftlet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'


const center = { lat: -18.865447, lng: 47.519533 }

export default function LocationModal({ handleSave }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //leaftlet
    const [position, setPosition] = useState(center);
    /////////// /////VIEW /////////  
    return (
        <>
            <Button className='mt-4' onClick={handleShow}>Carte</Button>
            <Modal
                size="lg"
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter votre Projet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} className="boxMain">
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false} onClick={alert('asd')}>
                                <TileLayer

                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[51.5, -0.09]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                    <Popup minWidth={90}>
                                        fdghjkhgfd
                                    </Popup>
                                </Marker>
                                {/* <Marker position={[18.3455, -0.09]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                <Popup minWidth={90}>
                                    fdghjkhgfd
                                </Popup>
                            </Marker> */}
                            </MapContainer>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
