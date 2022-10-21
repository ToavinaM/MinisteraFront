// import React, { useState } from 'react';

// import { Button, Col, Modal, Row } from 'react-bootstrap';
// //leftlet
// import { MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import './styles.css';
// import 'leaflet/dist/leaflet.css';
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
// import { Icon } from 'leaflet'


// const center = { lat: -18.865447, lng: 47.519533 }

// export default function LocationModal({ handleSave }) {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);


//     //leaftlet
//     const [position, setPosition] = useState(center);
//     /////////// /////VIEW /////////  
//     return (
//         <>
//             <Button className='mt-4' onClick={handleShow}>Carte</Button>
//             <Modal
//                 size="lg"
//                 show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Ajouter votre Projet</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Row>
//                         <Col sm={12} className="boxMain" onClick={(e) => console.log('asd', e)}>
//                             {/* {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}  > */}
//                             {/* <TileLayer
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             />
//                             <Marker position={[51.5, -0.09]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
//                                 <Popup minWidth={90}>
//                                     fdghjkhgfd
//                                 </Popup>
//                             </Marker> */}
//                             {/* <Marker position={[18.3455, -0.09]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
//                                 <Popup minWidth={90}>
//                                     fdghjkhgfd
//                                 </Popup>
//                             </Marker> */}
//                             {/* </MapContainer> */} */}

//                             <Map center={position} zoom={13} onClick={this.handleClick}>
//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />
//                                 <Marker position={this.state.currentPos} draggable={true}>
//                                     <Popup position={this.state.currentPos}>
//                                         Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
//                                     </Popup>
//                                 </Marker>}
//                             </Map>
//                         </Col>
//                     </Row>

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }



import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

class LocationModal extends Component {
    state = { map: null };

    componentDidUpdate(prevProps, prevState) {
        const { map } = this.state;
        if (prevState.map !== map && map) {
            map.on("click", function (e) {
                alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
            });
        }
    }

    render() {
        const DEFAULT_LATITUDE = -18.865447;
        const DEFAULT_LONGITUDE = 47.519533;
        const latitude = this.props.coords
            ? this.props.coords.latitude
            : DEFAULT_LATITUDE;
        const longitude = this.props.coords
            ? this.props.coords.latitude
            : DEFAULT_LONGITUDE;

        return (
            <MapContainer
                className="leaflet-map"
                center={[latitude, longitude]}
                zoom={17}
                scrollWheelZoom={true}
                style={{ height: "100vh" }}
                whenCreated={(map) => this.setState({ map })}
                onClick={(a) => alert('asd')}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                    <Popup>Here you are ^_^</Popup>
                </Marker>
            </MapContainer>
        );
    }
}

export default LocationModal;
