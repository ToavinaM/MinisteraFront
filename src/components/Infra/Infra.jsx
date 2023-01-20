import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Navbar, NavDropdown, Row, Table } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import ServiceInfra from './service';

const Infra = () => {
    const [infra, setinfra] = useState([]);

    useEffect(() => {
        ServiceInfra.getAllInfra()
        .then(rep=>{
            setinfra(rep.data);
            console.log(rep);
        })
        .catch(err=>{
            console.log('some err in infra',err);
            alert(err.message);
        })
    }, []);

    return (
        <div>
            <Row>
                <Navbar bg="light" expand="lg">
                 <Container fluid>
                    <Navbar.Brand href="#">  <img className="ministeraSary" src='../ministere.png'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/infra">Tableau</Nav.Link>
                        <Nav.Link href="/carto_infra">Cartografier</Nav.Link>
                       
                       
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                 </Container>
                </Navbar>
            </Row>
            <Row className='container-fluid my-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Région</th>
                            <th>District</th>
                            <th>Communes</th>
                            <th>Localité (Fkt)</th>
                            <th>Milieu</th>
                            <th>Nombre points d'eau</th>
                            <th>Nombre bénéficiaires</th>
                            <th>Type_infrastructure</th>
                            <th>Type_Travaux</th>
                            <th>Type_gestion</th>
                            <th> Montant Réel (Ariary) </th>
                            <th>Financement</th>
                            <th>Date prévue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            infra &&(
                                infra.map(inf=>{
                                    return(
                                    <tr>
                                        <td>{inf.region}</td>
                                        <td>{inf.district}</td>
                                        <td>{inf.communes}</td>
                                        <td>{inf.localite}</td>
                                        <td>{inf.milieu}</td>
                                        <td>{inf.nb_point_eau}</td>
                                        <td>{inf.nb_benef}</td>
                                        <td>{inf.type_infra}</td>
                                        <td>{inf.type_travaux}</td>
                                        <td>{inf.type_gestion}</td>
                                        <td>{inf.montant_reel}</td>
                                        <td>{inf.financement}</td>
                                        <td>{inf.date_prevue}</td>
                                    </tr>
                                    )
                                })
                            )
                        }
                     
                    </tbody>
                </Table>
            </Row>
        </div>
    );
}

export default Infra;
