import React, { useState } from 'react'
import { Col, Modal, Row, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'

import DatePicker from 'react-date-picker'
import Swal from 'sweetalert2';
//reducer
// import { useDispatch } from 'react-redux';
const options = [
  {
    id: 1,
    name: "Bas",
    color: "blue"
  },
  {
    id: 2,
    name: "Moyen",
    color: "#0ff10f"
  },
  {
    id: 3,
    name: "Urgent",
    color: "red"
  },
];

// simulation id pour card supprimer

export default function SupprimerCard({ id }) {
  //redurcer
  // const dispatch = useDispatch();

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  //formulaire
  const [priority, setpriority] = useState("Bas");
  const [description, setdescription] = useState("");
  const [output, setoutput] = useState("");
  const [debut, setDebut] = useState(new Date());
  const [fin, setFin] = useState(new Date());

  const handleDelete = () => {
    Swal.fire({
      title: 'Confirm?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimer',
          'Tache supprimer',
          'success'
        ).then(() => {

          // dispatch(deleteTacheR());
          // setnewtask((arraytask) => [...arraytask, modelTask]);
          // dispatch(addTache(modelTask));
          // console.log(tache);
          setShow(false);
        })
      }
    })
  }
  return (
    <div>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>Delete</strong>.
          </Tooltip>
        }
      >
        <img onClick={handleDelete} className='logos' src='./delete.png' />
      </OverlayTrigger>




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier cette Tache</Modal.Title>
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
              <Row>
                <Form.Label>Priorité</Form.Label>
                <Col>
                  <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value) }} style={{ padding: "10px" }}>
                    {options.map(option => {
                      return (
                        <option style={{ color: option.color }} key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Déscription</Form.Label>
              <Form.Control onChange={(rep) => { setdescription(rep.target.value) }} as="textarea" rows={3} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Output</Form.Label>
              <Form.Control onChange={(rep) => { setoutput(rep.target.value) }} as="textarea" rows={3} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
