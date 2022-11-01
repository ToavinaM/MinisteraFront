import React, { useState } from 'react';
///leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'


import { Col, Row } from 'react-bootstrap';
import Nav from '../Nav/Nav';
import Header from '../header/Header';



const center = { lat: -18.865447, lng: 47.519533 }


const MyMap = () => {
    const [position, setPosition] = useState(center);
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
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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

                </Col>

            </Row >
        </div>
    )
}

export default MyMap;
