import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Col, Row } from 'react-bootstrap';
import Nav from '../Nav/Nav';
import Header from '../header/Header';

const center = { lat: -18.865447, lng: 47.519533 }
const MyMap = () => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    // const position = [51.505, -0.09]
    return (
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
                            <Marker
                                draggable={draggable}
                                eventHandlers={eventHandlers}
                                position={position}
                                ref={markerRef}>
                                <Popup minWidth={90}>
                                    <span onClick={toggleDraggable}>
                                        {draggable
                                            ? 'Marker is draggable'
                                            : 'Click here to make marker draggable'}
                                    </span>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Col>
                </Row>

            </Col>

        </Row >
    )
}

export default MyMap;
