import React, { useEffect, useState } from 'react';
// import { BsPlusCircle } from "react-icons/bs";
import { Button, Col, Modal, Row, Form, Dropdown, FloatingLabel } from 'react-bootstrap';
//date
import DatePicker from 'react-date-picker'
import Swal from 'sweetalert2';
//reducer
// import { addTache } from './TacheSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';

const options = [
  {
    id: 1,
    name: "Bas",
    // color: "blue"
  },
  {
    id: 2,
    name: "Moyen",
    // color: "#0ff10f"
  },
  {
    id: 3,
    name: "Urgent",
    // color: "red"
  },
];


export default function ModalAddTache({ handleSave }) {

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //formulaire
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
      debut,
      fin,
      PrioriteId,
      description,
      output,
      estAlerteur,
    }
    handleSave(modelTask);
    setShow(false);
  }

  // const validationPriority = (rep) => {
  //   setpriority(rep.target.value);
  // }
  console.log(PrioriteId);
  // useEffect(() => {
  //   // setshowDateAlerter(false);
  // }, [show])
  return (
    <>

      <Button variant="success" onClick={handleShow}>
        {' '}Ajouter
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
              <Row>
                <Form.Label>Priorité</Form.Label>
                <Col>
                  <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ padding: "10px" }}>
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
