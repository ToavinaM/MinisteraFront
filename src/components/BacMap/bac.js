import { React, useEffect, useRef, useState } from 'react'
import {
    MapContainer, Marker, Popup, TileLayer, useMap
} from 'react-leaflet'
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { useMapEvents, useMapEvent } from 'react-leaflet/hooks'
import { Icon } from 'leaflet';
import L from 'leaflet';
import ServiceBac from './service';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Nav from '../Nav/Nav'
import Legende from './Legende';
import DateTimePicker from 'react-datetime-picker';
const center = [-18.865447, 47.519533]



// function SetViewOnClick({ animateRef }) {
//     const map = useMapEvent('click', (e) => {
//         map.setView(e.latlng, map.getZoom(), {
//             animate: true,
//         })
//     })
//     return null
// }

let labelEtatBac = [
    { labele: 'tout', id: 0 },
    { labele: 'Quart', id: 1 },
    { labele: 'Demi', id: 2 },
    { labele: 'trois quart', id: 3 },
    { labele: 'Plein', id: 4 },
    { labele: 'Trop Plein', id: 5 },
    { labele: 'Debordement', id: 6 }
];
let labelEtatDebordement = [
    { labele: 'tout', id: 0 },
    { labele: 'Quart', id: 1 },
    { labele: 'Demi', id: 2 },
    { labele: 'trois quart', id: 3 },
    { labele: 'Plein', id: 4 },
    { labele: 'Trop Plein', id: 5 },
    { labele: 'Debordement', id: 6 }
]

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
    //stateLabele

    //stateLabele
    const [valuelabelEtatBac, setvaluelabelEtatBac] = useState(0);
    const [valuelabelEtatDebordement, setvaluelabelEtatDebordement] = useState(0);
    //state
    const [bacs, setbac] = useState(null);
    const [debut, setDebut] = useState(new Date());

    useEffect(() => {
        let requestFiltre = {
            etatBac: 0,
            etatDebordement: 0,
            date: {
                debut: '22/11/12',
                fin: '22/11/12',
            }
        }

        ServiceBac.getAllBac(requestFiltre)
            .then(rep => {
                console.log(rep.data);
                setbac(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }, [])
    //function
    function fetch() {
        // alert('huhu')

        console.log('xxx', valuelabelEtatBac, valuelabelEtatDebordement);
        let requestFiltre = {
            etatBac: valuelabelEtatBac,
            etatDebordement: valuelabelEtatDebordement,
            date: {
                debut: '22/11/12',
                fin: '22/11/12',
            }
        }

        ServiceBac.getAllBac(requestFiltre)
            .then(rep => {
                console.log('PPP', rep);
                setbac(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }

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
                        <Col sm={12} className="bg-white filtre">
                            {/* filtre */}
                            <Row className='p-3'>
                                <Col sm={7}>

                                </Col>
                                <Col sm={5} className="d-flex justify-content-around">
                                    <Form.Select
                                        values={{ valuelabelEtatBac }} onChange={async (rep) => { await setvaluelabelEtatBac(rep.target.value); }}
                                        style={{ width: "145px", padding: "10px" }}>
                                        <option value={0} >Etat Back</option>
                                        {labelEtatBac && labelEtatBac.map(option => {
                                            return (
                                                <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                    {option.labele}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.Select
                                        values={{ valuelabelEtatDebordement }} onChange={async (rep) => { await setvaluelabelEtatDebordement(rep.target.value); }}
                                        style={{ width: "145px", padding: "10px" }}>
                                        <option value={0}>Débord</option>
                                        {labelEtatDebordement && labelEtatDebordement.map(option => {
                                            return (
                                                <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                    {option.labele}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>

                                    <DateTimePicker className=" zindex-sticky:1020" onChange={setDebut} value={debut} />
                                    <Button onClick={fetch}>Filtrer</Button>
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
                                        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            {/* <SetViewOnClick animateRef={animateRef} /> */}
                                            {
                                                bacs !== null &&
                                                (
                                                    bacs.map(dt => {
                                                        return (
                                                            <>
                                                                {/* <Marker position={[dt.longitude, dt.latitude]} icon={new Icon({ iconUrl: './img/a.png', iconSize: new L.Point(50, 50) })}>

                                                                </Marker> */}
                                                                <Marker position={[dt.longitude, dt.latitude]} icon={new Icon({ iconUrl: require(`./img/${dt.etat_in_bac.toString()}.png`), iconSize: [50, 50] })}>
                                                                    <Popup minWidth={100}>
                                                                        <Popup key={dt.localisation + 'dq'} minWidth={100}>
                                                                            <p key={dt.localisation + 'qi'}>Nom Pc:{dt.nom_pc}</p>
                                                                            <p key={dt.localisation + 'q'}>Localisation:{dt.localisation}</p>
                                                                            <p key={dt.localisation + 'qw'}>Date Signalement:{dt.date_signalement}</p>
                                                                            <p key={dt.localisation + 'qe'}>Heure Signalement:{dt.heure_signalement}</p>
                                                                            <p key={dt.localisation + 'qt'}>Etat Bac:{dt.etat_in_bac}</p>
                                                                            <p key={dt.localisation + 'qr'}>Etat Débordement:{dt.etat_debordement}</p>
                                                                        </Popup>
                                                                    </Popup>
                                                                </Marker>

                                                            </>
                                                        )
                                                    })
                                                )
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
                                            <Legende />
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
