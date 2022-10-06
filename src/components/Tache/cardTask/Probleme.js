import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Button, Form, OverlayTrigger, Tooltip, FloatingLabel, Table } from 'react-bootstrap'
// import { Button } from 'react-bootstrap/lib/inputgroup'
// import { Form } from 'react-bootstrap/lib/navbar'
import DatePicker from 'react-date-picker'
import ProblemeTache from '../ProblemeTache';
import TacheService from '../Service';


export default function Probleme({ tache }) {
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //formulaire
    const [description, setdescription] = useState("");
    const [problemes, setprobleme] = useState([]);
    const [optionsProbleme, setoptionsProbleme] = useState([]);
    /////liste
    const [listeProbleme, setlisteProbleme] = useState([]);

    console.log('get id', problemes);
    ////FUNCTION
    const handleSave = () => {
        let data = {
            TacheId: tache.id,
            ProblemeId: problemes.id,
            description
        }
        console.log('SSSSSSSSSSSSSSSSSss', data);
        TacheService.saveProbleme(data)
            .then(rep => {
                console.log(rep);
            })
            .catch(err => {
                console.log(err);
            })

    }

    useEffect(() => {
        if (show) { /////important mncontrole an le izy tsy haka ny commentaire rehetra
            TacheService.getOptionProbleme()
                .then(rep => {
                    console.log(rep);
                    setoptionsProbleme(rep.data);
                })
                .catch(err => {
                    console.log(err);
                })

            TacheService.getProbleme(tache.id)
                .then(rep => {
                    console.log('PROBLEME LIE', rep);
                    setlisteProbleme(rep.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [show])
    console.log('listeprop', listeProbleme);

    return (
        <div>
            <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>Probleme</strong>.
                    </Tooltip>
                }
            >
                <img onClick={handleShow} className='logos' src='../probleme.png' />
            </OverlayTrigger>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header className='bg-warning' closeButton >
                    <Modal.Title style={{ color: 'white' }}>Signaler un probleme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='p-2'>
                        <Form.Select values={{ optionsProbleme }} onChange={(rep) => { setprobleme(rep.target.value); }} style={{ padding: "10px" }}>
                            {optionsProbleme.map(option => {
                                return (
                                    <option style={{ color: option.color }} key={option.id} value={option.id}>
                                        {option.labele}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Row>
                    <Row className='mt-5'>
                        <FloatingLabel className='p-2' controlId="floatingTextarea2" label=" Déscription">
                            <Form.Control onChange={(rep) => { setdescription(rep.target.value) }} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                        </FloatingLabel>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Labele</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeProbleme.map(prob => {
                                    return (

                                        <tr>
                                            {/* <td>{prob.Probleme.labele}</td> */}
                                            <td>{prob.description}</td>
                                            <td>{prob.createdAt}</td>
                                            <td>{(prob.isSolved).toString()}</td>
                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </Table>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Signaler
                    </Button>
                    <ProblemeTache></ProblemeTache>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
