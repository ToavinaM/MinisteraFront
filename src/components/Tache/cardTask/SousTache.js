import moment from 'moment';
import React, { useEffect, useState } from 'react'

import { Modal, Row, Button, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap'
import TacheService from '../Service';
import './sousTache.css'

// animation
import { fadeInLeft } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
const styles = {
    fadeInLeft: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInLeft, '')
    }
}

export default function SousTache({ tache }) {
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //formulaire
    const [intitule, setIntitule] = useState('');
    const [SousTache, setSousTache] = useState([]);
    // function
    // const handleSave = () => {
    //     TacheService.saveSousTache({ intitule, TacheId: tache.id })
    //         .then(rep => {
    //             console.log('save', rep.data);
    //             setSousTache([...SousTache, rep.data]);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    const handleSave = () => {

        let data = { TacheId: tache.id, labele: intitule, isChecked: true }

        TacheService.saveSousTache()
            .then(rep => {
                console.log('save', rep.data);
                setSousTache([...SousTache, rep.data]);
            })
    }
    useEffect(() => {
        console.log('ilay nalaina', tache.id)
        if (show) { /////important mncontrole an le izy tsy haka ny SousTache rehetra
            TacheService.getSousTacheByTache(tache.id)
                .then(rep => {
                    // alert('nak');
                    console.log(rep.data);
                    setSousTache(rep.data);
                })
                .catch(err => {
                    alert('somme error in server side');
                })
        }

    }, [show]);

    return (
        <div>
            <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>Commenter</strong>.
                    </Tooltip>
                }
            >
                <img onClick={handleShow} className='logos' src='../detail.png' />
            </OverlayTrigger>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHides={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SousTache lié a cette tache</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* //////////// liste des SousTaches*/}
                        <Row>
                            <Col className="boxSousTache">
                                <StyleRoot>
                                    {
                                        SousTache.map(soustache => {
                                            // console.log(coms);
                                            return (
                                                <div className='soustache' style={styles.fadeInLeft} >
                                                    <Row key={soustache.id + 'r'}>
                                                        <Col sm={1} key={soustache.id + 'c2'}>
                                                            <Form.Check
                                                                type='checkbox'
                                                                id={`default-checkbox`}
                                                            // label={`terminer`}
                                                            />
                                                        </Col>
                                                        <Col key={soustache.id + 'c'}>
                                                            <p className='pComs' key={soustache.id} > {soustache.labele}</p>
                                                        </Col>
                                                        <Col sm={4} key={soustache.id + 'c2'}>
                                                            <p className='' key={soustache.createdAt} > {moment(soustache.createdAt).format('DD-MM-YY HH:MM')}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })
                                    }
                                </StyleRoot>
                            </Col>
                        </Row>
                        {/* ////////////////// */}
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Ecrire un commentaire</Form.Label>
                            <Form.Control onChange={(rep) => { setIntitule(rep.target.value) }} as="textarea" rows={3} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        commenter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    )
}
