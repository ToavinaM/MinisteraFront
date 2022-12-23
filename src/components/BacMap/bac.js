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
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const center = [-18.865447, 47.519533]

let labelEtatBac = [
    { labele: 'tout', id: 0 },
    { labele: 'Quart', id: 1 },
    { labele: 'Demi', id: 2 },
    { labele: 'trois quart', id: 3 },
    { labele: 'Plein', id: 4 },
    { labele: 'Trop Plein', id: 5 },
    { labele: 'Débordement', id: 6 }
];

let labelEtatDebordement = [
    { labele: 'tout', id: 0 },
    { labele: 'Quart', id: 1 },
    { labele: 'Demi', id: 2 },
    { labele: 'trois quart', id: 3 },
    { labele: 'Plein', id: 4 },
    { labele: 'Trop Plein', id: 5 },
    { labele: 'Débordement', id: 6 }
];

export default function Bac() {
    const [valuelabelEtatBac, setvaluelabelEtatBac] = useState(0);
    const [valuelabelEtatDebordement, setvaluelabelEtatDebordement] = useState(0);
    //state
    const [bacs, setbac] = useState([]);
    const [debut, setDebut] = useState(new Date());

    useEffect(() => {
        let requestFiltre = {
            etatBac: 0,
            etatDebordement: 0,
            date: new Date()
        }

        ServiceBac.getAllBac(requestFiltre)
            .then(rep => {
                if (rep.data.length === 0) {
                    Swal.fire({
                        toast: true,
                        title: "Pas d'information pour cette date",
                        timer: 3000,
                        icon: 'info',
                    })
                }
                setbac(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }, [])

    //function
    function fetch() {
        let requestFiltre = { etatBac: valuelabelEtatBac, etatDebordement: valuelabelEtatDebordement, date: debut }
        ServiceBac.getAllBac(requestFiltre)
            .then(rep => {
                if (rep.data.length === 0) {
                    Swal.fire({
                        toast: false,
                        title: "Pas d'information pour cette date",
                        timer: 3000,
                        icon: 'info',
                    })
                }
                setbac(rep.data);
            })
            .catch(err => {
                console.log('error', err);
            })
    }



    //view  
    return (
        <div>
            <Row className='container-fluid'>
                <Col md={2}>
                    <Nav></Nav>
                </Col>
                <Col md={10} className={'container'}>
                    <Row>
                        <Col md={12} className="bg-white filtre">
                            {/* filtre */}
                            <Row className='p-3'>
                                <Col md={5}>

                                </Col>
                                <Col md={7} className="d-flex justify-content-around">
                                    <Form.Select
                                        values={{ valuelabelEtatBac }} onChange={async (rep) => { await setvaluelabelEtatBac(rep.target.value); }}
                                        style={{ width: "145px", padding: "10px" }}>
                                        <option value={0} >Etat Bac</option>
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

                                    <DateTimePicker className="dateCss" onChange={setDebut} value={debut} />
                                    <Button onClick={fetch}>Filtrer</Button>
                                </Col>
                                <Col md={1} className='mt-3'>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            {
                                                bacs !== [] &&
                                                (
                                                    bacs.map(dt => {
                                                        return (
                                                            <>
                                                                <Marker position={[dt.longitude, dt.latitude]} icon={new Icon({ iconUrl: require(`./img/${dt.etat_in_bac.toString()}.png`), iconSize: [50, 50] })}>
                                                                    <Popup key={dt.localisation + 'dq'} minWidth={100}>
                                                                        <p key={dt.localisation + 'qi'}>Nom Pc:{dt.nom_pc}</p>
                                                                        <p key={dt.localisation + 'q'}>Localisation:{dt.localisation}</p>
                                                                        <p key={dt.localisation + 'qw'}>Date Signalement:{dt.date_signalement}</p>
                                                                        <p key={dt.localisation + 'qe'}>Heure Signalement:{dt.heure_signalement}</p>
                                                                        <p key={dt.localisation + 'qt'}>Etat Bac:{labelEtatBac[dt.etat_in_bac]['labele']}</p>
                                                                        <p key={dt.localisation + 'qr'}>Etat Débordement:{labelEtatDebordement[dt.etat_debordement]['labele']}</p>
                                                                    </Popup>
                                                                </Marker>
                                                            </>
                                                        )
                                                    })
                                                )
                                            }
                                            {/*3) ////////////////////////controleur */}
                                            <Legende labelEtatBac={labelEtatBac} />
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
