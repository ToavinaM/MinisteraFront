import React, { useEffect, useState } from 'react'
import { Row, Col, Pagination, Table, Form } from 'react-bootstrap';

// import './Projet.css';
import Nav from '../Nav/Nav';
import Header from '../header/Header';
//component
//service
//redux
import { BeatLoader } from 'react-spinners';
import ServiceForAll from '../ServiceForAll';
let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}
const options = [
    { id: 1, name: "Bas" },
    { id: 2, name: "Moyen" },
    { id: 3, name: "Urgent" },
];

export default function GestionUser() {

    const [departement, setdepartement] = useState([])
    const [role, setrole] = useState([])

    useEffect(() => {
        ServiceForAll.getDept()
            .then(rep => {
                setdepartement(rep.data);
            })
            .catch(err => {
                console.log(err);
            });
        ServiceForAll.getRole()
            .then(rep => {
                setrole(rep.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    //FUNCTION
    return (
        <Row className='container-fluid'>
            <Col sm={2}>
                <Nav></Nav>
            </Col>
            <Col sm={10} className={'container'}>
                <Row>
                    <Header></Header>
                </Row>
                <Row>
                    <Col sm={12} className="ListProjet">
                        <Row className='p-3'>
                            <Col>
                                <h5>Gestions des utilisateurs</h5>
                            </Col>
                            <Col sm={3}>
                                <Pagination size="lg">{items}</Pagination>
                            </Col>
                            <Col sm={1} className='mt-3'>
                                {/* <AddProject handleSave={handleSave}></AddProject> */}
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col sm={12} className="containerListProjet">
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>mail</th>
                                            <th>Departement</th>
                                            <th>Role</th>
                                            <th>Date Inscription</th>
                                            <th>Activer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Rakotomanana</td>
                                            <td>Rakotomanana@gmail.com</td>
                                            <td>
                                                {/* <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ padding: "10px" }}> */}
                                                <Form.Select values={{ departement }} onChange={(rep) => { console.log(rep.target.value); }} style={{ padding: "10px" }}>
                                                    <option>Départemnet</option>
                                                    {departement.map(option => {
                                                        return (
                                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                                {option.intitule}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Select values={{ role }} onChange={(rep) => { console.log(rep.target.value); }} style={{ padding: "10px" }}>
                                                    <option>Role</option>
                                                    {role.map(option => {
                                                        return (
                                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                                {option.name}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </td>
                                            <td>20/11/22</td>
                                            <td>
                                                <input type="checkbox" className="form-check-input" />
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>Rakotomanana</td>
                                            <td>Rakotomanana@gmail.com</td>
                                            <td>
                                                {/* <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ padding: "10px" }}> */}
                                                <Form.Select values={{ options }} onChange={(rep) => { console.log(rep.target.value); }} style={{ padding: "10px" }}>
                                                    <option>Priorité</option>
                                                    {options.map(option => {
                                                        return (
                                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                                {option.name}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Select values={{ options }} onChange={(rep) => { console.log(rep.target.value); }} style={{ padding: "10px" }}>
                                                    <option>Priorité</option>
                                                    {options.map(option => {
                                                        return (
                                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                                {option.name}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </td>
                                            <td>20/11/22</td>
                                            <td>
                                                <input type="checkbox" className="form-check-input" />
                                            </td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row >
    )
}
