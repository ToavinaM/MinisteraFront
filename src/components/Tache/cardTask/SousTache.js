import moment from 'moment';
import React, { useEffect, useState } from 'react'

import { Modal, Row, Button, Form, OverlayTrigger, Tooltip, Col, ProgressBar } from 'react-bootstrap'
import TacheService from '../Service';
import './sousTache.css'

// animation
import { fadeInRight } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import Swal from 'sweetalert2';

const styles = {
    fadeInRight: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInRight, '')
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
    //avancemnet
    const [moyenne, setmoyenne] = useState(null);
    //calcul nombre terminer et non terminer 
    const [terminer, setterminer] = useState(0);

    // console.log('moyenne', moyenne);
    // function
    const calculAvancement = (rep) => {
        console.log('calcule avancement  kjguyg', rep);
        let checkNumber = 0;
        for (var total = 0; total < rep.length; total++)
            if (rep[total].isChecked) checkNumber++;
        setmoyenne((checkNumber * 100) / total);
        setterminer(checkNumber);
    }

    //////////////////////mila mi update ny state soustache ito manjary tsy miov a ilay avancemewnt 
    const handleSetCheck = (event, soustache) => {
        let isChecked = event.target.checked
        TacheService.setCheck({ isChecked, id: soustache.id })
            .then(rep => {
                // console.log('ovaina', soustache);
                const newState = SousTache.map(pop => {
                    if (pop.id === soustache.id) {
                        return { ...pop, isChecked };
                    }
                    return pop;
                })
                setSousTache(newState);
                calculAvancement(newState);  //////this is importatnt
            })
            .catch(er => {
                console.log(er);
            })
    }


    const handleSave = () => {
        TacheService.saveSousTache({ TacheId: tache.id, labele: intitule })
            .then(rep => {
                console.log('save', rep.data);
                setSousTache([...SousTache, rep.data]);
            })
            .catch(err => alert('somme error in server side'));
    }

    const handleDeleteL = (data) => {
        // console.log('HOFAFANA', test);
        Swal.fire({
            title: 'Confirm?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire(
                //     'Supprimer',
                //     'Sous Tache supprimer',
                //     'success'
                // ).then(() => {
                setSousTache(SousTache.filter(t => t.id !== data.id));
                // })
            }
        })
    }



    // useEffect(() => {
    //     calculAvancement(SousTache);
    // }, [SousTache]);

    useEffect(() => {
        // console.log('ilay nalaina', tache.id)
        if (show) { /////important mncontrole an le izy tsy haka ny SousTache rehetra
            TacheService.getSousTacheByTache(tache.id)
                .then(rep => {
                    calculAvancement(rep.data);
                    setSousTache(rep.data);
                })
                .catch(err => {
                    alert(err);
                })
        }

    }, [show]);

    // console.log('GGGGGGGGGGGGGggggg', moyenne);
    return (
        <div>
            {/* <p>Ajouter</p> */}
            <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>Checklist</strong>.
                    </Tooltip>
                }
            >
                <img onClick={handleShow} className='logos' src='../check.png' />
            </OverlayTrigger>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>SousTache lié a cette tache</Modal.Title>


                </Modal.Header>
                <Modal.Body>
                    <Row>

                        <Col sm={4}>
                            {
                                moyenne ? (
                                    <ProgressBar now={moyenne} label={moyenne} variant='info' />) : (
                                    <ProgressBar variant='info' now='100' label='0%' animated={true} />
                                )
                            }
                        </Col>
                        <Col sm={2}>
                            <p>{terminer}/{SousTache.length}</p>
                        </Col>
                    </Row>

                    <Form>
                        {/* //////////// liste des SousTaches*/}
                        <Row>
                            <Col className="boxSousTache">
                                <StyleRoot>
                                    {
                                        SousTache.map(soustache => {
                                            // console.log(coms);
                                            return (
                                                <div key={soustache.id + 'div'} className='soustache' style={styles.fadeInRight} >
                                                    <Row className='mt-2' key={soustache.id + 'r'}>
                                                        <Col sm={1} key={soustache.id + 'c2'}>
                                                            <Form.Check
                                                                key={soustache.id + 'chk'}
                                                                type='checkbox'
                                                                id={`default-checkbox`}
                                                                defaultChecked={soustache.isChecked}
                                                                // label={`terminer`}
                                                                // onChange={(value, soustache) => console.log(value.target.checked, soustache)}
                                                                onChange={(e) => handleSetCheck(e, soustache)}
                                                            />
                                                        </Col>
                                                        <Col key={soustache.id + 'cs'}>
                                                            <p className='pComs' key={soustache.id + 'ewr'} > {soustache.labele}</p>
                                                        </Col>
                                                        <Col sm={3} key={soustache.id + 'cas2'}>
                                                            <p className='' key={soustache.createdAt} > {moment(soustache.createdAt).format('DD-MM-YY HH:MM')}</p>
                                                        </Col>
                                                        <Col sm={1} key={soustache.id + 'cdvf2'}>
                                                            <img key={soustache.id + 'cvf2'} onClick={() => handleDeleteL(soustache)} className='logos' src='../delete.png' />
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
                            <Form.Label>Ajouter un sous Tache</Form.Label>
                            <Form.Control onChange={(rep) => { setIntitule(rep.target.value) }} as="textarea" rows={3} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    )
}
