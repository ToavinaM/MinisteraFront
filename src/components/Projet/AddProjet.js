import React, { useState } from 'react';

// import { BsPlusCircle } from "react-icons/bs";

import { Button, Col, Modal, Row, Form, Dropdown, Alert } from 'react-bootstrap';

//date
import DatePicker from 'react-date-picker'
//reducer
// import {addProjet} from './ProjetSlice';
// import { useDispatch } from 'react-redux';
//service
import ServiceProjet from '../Projet/Projet.service';



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
        //  size="lg"
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
