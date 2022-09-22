import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../header/Header';
import Nav from '../Nav/Nav';
import './parametre.css'

const Parametre = () => {
    return (
        <div>
            <Row className='container-fluid'>
                <Col sm={2}>
                    <Nav></Nav>
                </Col>
                <Col sm={10} className={'container'}>
                    <Row>
                        <Header></Header>
                    </Row>

                    <Row>
                        <div className='boxParametre p-5'>
                            <Row>
                                <Col>
                                    <h5 style={{ color: 'grey' }}>Gestion des alerteurs</h5>
                                </Col>
                                <Col className='ml-2' sm={2}>
                                    <Button class="btn btn-success mb-2 w-100">Enregistrer</Button>
                                </Col>

                                <hr></hr>
                                <Col className='mt-4 m-auto boxPrio p-auto' style={{ borderLeft: ' #5050f4 5px solid' }} sm={4}>
                                    <h6 style={{ color: 'gray' }}>Bas</h6>
                                    <center>

                                        <label>en heure:</label><input value="13:00" type='time' className='inpuT' />
                                        <label> ou en Jours :</label><input value="1" type='number' className='inpuT' />
                                    </center>
                                    <br></br>
                                    <p style={{ color: 'gray' }}>Actuelement : 5h avant </p>
                                </Col>
                                <Col className='mt-4 m-auto boxPrio p-auto' style={{ borderLeft: ' #22ee05 5px solid' }} sm={4}>
                                    <h6 style={{ color: 'gray' }}>Moyen</h6>
                                    <center>
                                        <label>en heure : </label><input value="13:00" type='time' className='inpuT' />
                                        <label> ou en Jours :</label><input value="1" type='number' className='inpuT' />
                                    </center>
                                    <br></br>
                                    <p style={{ color: 'gray' }}>Actuelement : 1j avant</p>

                                </Col>
                                <Col className='mt-4 m-auto boxPrio p-auto' style={{ borderLeft: ' #ee0505  5px solid' }} sm={4}>
                                    <h6 style={{ color: 'gray' }}>Urgent</h6>
                                    <center>
                                        <label>en heure :</label><input value="13:00" type='time' className='inpuT' />
                                        <label> ou en Jours :</label><input value="1" type='number' className='inpuT' />
                                    </center>
                                    <br></br>
                                    <p style={{ color: 'gray' }}>Actuelement : 2j avant</p>

                                </Col>
                                {/* <input/> */}
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Row >
        </div>
    );
}

export default Parametre;
