import { React, useEffect, useRef, useState } from 'react'
import {
    Circle, FeatureGroup, LayerGroup, LayersControl,
    MapContainer, Marker, Popup, TileLayer, useMap,
} from 'react-leaflet'
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { useMapEvents, useMapEvent } from 'react-leaflet/hooks'
import { Icon } from 'leaflet';
import L from 'leaflet';
import ServiceBac from './service';
import { Col, Form, Row } from 'react-bootstrap';
import Nav from '../Nav/Nav'
import Legende from './Legende';
const center = [-18.865447, 47.519533]

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
        })
    })
    return null
}

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}
export default function Bac() {
    //state
    const [bacs, setbac] = useState(null);
    let [map, setMap] = useMap();
    //ftch
    useEffect(() => {
        ServiceBac.getAllBac()
            .then(rep => {
                setbac(rep.data);
                console.log(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }, [])
    //function
    function generatePath(dt) {
        if (parseInt(dt.etat_in_bac) < 5) {
            return './img/vert-blanc.png';
        }
        if (parseInt(dt.etat_in_bac) === 5) {
            return './img/jaune-blanc.png';
        }
        if (parseInt(dt.etat_in_bac) >= 6) {
            return './img/rouge-blanc.png';
        }
        else {
            return './img/rouge-noir.png';
        }
    }
    const animateRef = useRef(false)
    //view  

    return (
        <div>

            <Row className='container-fluid'>
                <Col sm={2}>
                    <Nav></Nav>
                </Col>
                <Col sm={10} className={'container'}>
                    <Row>
                        <Col sm={12} className="bg-white">
                            {/* filtre */}
                            <Row className='p-3'>
                                <Col sm={10} className="d-flex ">
                                    <Form.Select
                                        // values={{ optionsPriority }} onChange={(rep) => { setpriority(rep.target.value); }}
                                        style={{ width: "145px", padding: "10px" }}>
                                        <option>Priorite</option>
                                    </Form.Select>
                                    <Form.Select
                                        // values={{ optionsPriority }} onChange={(rep) => { setpriority(rep.target.value); }}
                                        style={{ width: "145px", padding: "10px" }}>
                                        <option>Priorite</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={1} className='mt-3'>

                                </Col>
                            </Row>

                            {/* //map */}
                            <Row>

                                <Col sm={12}>
                                    <Row>
                                        {/* 1) useRef */}
                                        {/* <p>
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    animateRef.current = !animateRef.current
                                                    console.log(animateRef);
                                                }}
                                            />
                                            Animate panning
                                        </label>
                                    </p> */}
                                        <MapContainer whenReady={setMap()} center={center} zoom={13} scrollWheelZoom={false}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <SetViewOnClick animateRef={animateRef} />
                                            {
                                                bacs !== null &&
                                                (
                                                    bacs.map(dt => {
                                                        return (
                                                            <Marker position={[dt.longitude, dt.latitude]} icon={new Icon({ iconUrl: generatePath(dt).toString(), iconSize: new L.Point(50, 50) })}>
                                                                <Popup minWidth={100}>
                                                                    <Popup key={dt.localisation + 'dq'} minWidth={100}>
                                                                        <p key={dt.localisation + 'q'}>localisation:{dt.localisation}</p>
                                                                        <p key={dt.localisation + 'qw'}>date_signalement:{dt.date_signalement}</p>
                                                                        <p key={dt.localisation + 'qe'}>heure_signalement:{dt.heure_signalement}</p>
                                                                        <p key={dt.localisation + 'qr'}>etat_debordement:{dt.etat_debordement}</p>
                                                                        <p key={dt.localisation + 'qt'}>etat_in_dt:{dt.etat_in_bac}</p>
                                                                        <p key={dt.localisation + 'qy'}>latitude:{parseFloat(dt.latitude)}</p>
                                                                        <p key={dt.localisation + 'qu'}>longitude:{parseFloat(dt.longitude)}</p>
                                                                        <p key={dt.localisation + 'qi'}>nom_pc:{dt.nom_pc}</p>
                                                                    </Popup>
                                                                </Popup>
                                                            </Marker>
                                                        )
                                                    }))
                                            }

                                            {/*3) ////////////////////////controleur */}
                                            {/* <LayersControl position="topright">
                    <LayersControl.Overlay name="Marker with popup">
                        <Marker position={center}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Layer group with circles">
                        <LayerGroup>
                            <Circle
                                center={center}
                                pathOptions={{ fillColor: 'blue' }}
                                radius={200}
                            />
                            <Circle
                                center={center}
                                pathOptions={{ fillColor: 'red' }}
                                radius={100}
                                stroke={false}
                            />
                            <LayerGroup>
                                <Circle
                                    center={[51.51, -0.08]}
                                    pathOptions={{ color: 'green', fillColor: 'green' }}
                                    radius={100}
                                />
                            </LayerGroup>
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Feature group">
                        <FeatureGroup pathOptions={{ color: 'purple' }}>
                            <Popup>Popup in FeatureGroup</Popup>
                            <Circle center={[51.51, -0.06]} radius={200} />
                            <Rectangle bounds={rectangle} />
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl> */}
                                            {/* 4My component  */}
                                            {/* <Marker
                    position={center}
                    eventHandlers={{
                        click: () => {
                            console.log('marker clicked')
                        },
                    }}

                /> */}

                                            {/* <MyComponent></MyComponent> */}
                                            <Legende map={map} />
                                        </MapContainer>
                                    </Row>

                                </Col>



                            </Row>

                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >



    )
}
