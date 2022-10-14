import React, { useState } from 'react';

// import { BsPlusCircle } from "react-icons/bs";

import { Button, Col, Modal, Row, Form } from 'react-bootstrap';

//date
import DatePicker from 'react-date-picker'
import LocationModal from '../MyMap/LocationModal';
//reducer

export default function AddProject({ handleSave }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //formulaire
  const [titre, settitre] = useState("");
  const [debut, setDebut] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  ////////FONCTION/////////////////
  const handleSaveLocal = () => {
    const modelProjet = {
      debut,
      fin,
      titre
    }

    handleSave(modelProjet);
    setShow(false);
  }

  /////////// /////VIEW /////////  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nouveaux projet
      </Button>


      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter votre Projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Debut</Form.Label>
                  <DatePicker onChange={setDebut} value={debut} />
                </Col>
                <Col>
                  <Form.Label>Fin</Form.Label>
                  <DatePicker onChange={setFin} value={fin} />
                </Col>
              </Row>
              <br></br>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Titre de votre projet</Form.Label>
              <Form.Control onChange={(rep) => { settitre(rep.target.value) }} rows={3} />
            </Form.Group>
            <Row>

              <Col sm={4}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control onChange={(rep) => { settitre(rep.target.value) }} rows={3} />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control onChange={(rep) => { settitre(rep.target.value) }} rows={3} />
                </Form.Group>
              </Col>
              <Col sm={4} className='mt-2'>
                <LocationModal></LocationModal>
              </Col>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveLocal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
