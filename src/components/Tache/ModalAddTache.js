import React, { useState } from 'react';
import { Button, Col, Modal, Row, Form, FloatingLabel } from 'react-bootstrap';
//date
import DatePicker from 'react-date-picker'
import useSound from 'use-sound';
import create from '../sound/create.mp3';
const options = [
  { id: 1, name: "Bas" },
  { id: 2, name: "Moyen" },
  { id: 3, name: "Urgent" },
];


export default function ModalAddTache({ handleSave }) {
  //sound
  const [play] = useSound(create, { volume: 1 });
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //formulaire
  const [titre, settitre] = useState('');
  const [PrioriteId, setpriority] = useState(1);
  const [showDateAlerter, setshowDateAlerter] = useState(false);
  const [description, setdescription] = useState("");
  const [output, setoutput] = useState("");
  const [debut, setDebut] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const [estAlerteur, setalerteur] = useState(false);
  //data generer
  //function
  const handleSaveLocal = () => {
    const modelTask = {
      titre,
      debut,
      fin,
      PrioriteId,
      description,
      output,
      estAlerteur,
    }
    handleSave(modelTask);
    play();
    setShow(false);

  }


  return (
    <>

      {/* <button className='pushable' onClick={handleShow}>
        <span className='front'>
          Ajouter
        </span>
      </button> */}

      <Button onClick={handleShow}>Ajouter</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-success' closeButton>
          <Modal.Title>Ajouter nouvelle Tache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col className='m-2'>
                  <p>Debut</p>
                  <DatePicker onChange={setDebut} value={debut} />
                </Col>
                <Col className='m-auto'>
                  <p>Fin</p>
                  <DatePicker onChange={setFin} value={fin} />
                </Col>
              </Row>
              <br></br>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control onChange={(rep) => { settitre(rep.target.value) }} rows={3} />
              </Form.Group>
              <Row>
                {/* <Form.Label>Priorité</Form.Label> */}
                <Col>
                  <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ padding: "10px" }}>
                    <option>Priorité</option>
                    {options.map(option => {
                      return (
                        <option style={{ color: option.color }} key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                {/* <br></br> */}
                <Col className="mt-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Activer alerteur"
                    onChange={(e) => setalerteur(e.target.checked)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <FloatingLabel controlId="floatingTextarea2" label="Déscription">
              <Form.Control onChange={(rep) => { setdescription(rep.target.value) }} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel controlId="floatingTextarea2" label="Output">
              <Form.Control onChange={(rep) => { setoutput(rep.target.value) }} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
            </FloatingLabel>

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
