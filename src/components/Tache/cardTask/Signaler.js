import React, { useState } from 'react'
import { Col, Modal, Row, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
// import { Button } from 'react-bootstrap/lib/inputgroup'
// import { Form } from 'react-bootstrap/lib/navbar'
import DatePicker from 'react-date-picker'

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

export default function Signaler() {
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //formulaire
  const [priority, setpriority] = useState("Bas");
  const [description, setdescription] = useState("");
  const [output, setoutput] = useState("");
  const [debut, setDebut] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  return (
    <div>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>Alarm</strong>.
          </Tooltip>
        }
      >
        {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
        <img onClick={handleShow} className='logos' src='../alarm1.png' />
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
