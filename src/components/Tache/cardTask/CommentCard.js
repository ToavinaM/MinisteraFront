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

export default function CommentCard() {
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
            <strong>Commenter</strong>.
          </Tooltip>
        }
      >
        <img onClick={handleShow} className='logos' src='../comment.png' />
      </OverlayTrigger>




      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHides={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Commentaire lié a cette tache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>

              </Row>
              <br></br>
              {/* <Row>
                        <Form.Label>Priorité</Form.Label>
                        <Col>
                            <Form.Select  values={{options}} onChange={(rep)=>{setpriority(rep.target.value)}} style={{padding:"10px"}}>
                               {options.map(option=>{
                                return (
                                  <option style={{color:option.color}} key={option.id} value={option.name}>
                                    {option.name}
                                  </option>
                                )
                               })}
                            </Form.Select>
                        </Col>
                    </Row> */}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Dsi</Form.Label>
              <Form.Control onChange={(rep) => { setdescription(rep.target.value) }} as="textarea" rows={3} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Commentaire</Form.Label>
              <Form.Control onChange={(rep) => { setoutput(rep.target.value) }} as="textarea" rows={3} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            commenter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
