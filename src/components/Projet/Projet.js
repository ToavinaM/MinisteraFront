import React, { useEffect, useState } from 'react'
import { Row, Col, Pagination } from 'react-bootstrap';

import './Projet.css';
import Nav from '../Nav/Nav';
import Header from '../header/Header';
//component
import AddProject from './AddProjet';
import CardProjet from './CardProjet';
//service
import ServiceProjet from './Projet.service';
//redux
import { BeatLoader } from 'react-spinners';

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}

export default function Projet() {
    const [projet, setProjet] = useState(null);

    useEffect(() => {
        document.title = 'Projet DSI';
        ServiceProjet.getAll()
            .then(rep => {
                setTimeout(() => {
                    setProjet(rep.data);
                    // console.log('===========', rep.data);
                }, 600);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //FUNCTION
    const handleSave = (newprojet) => {
        console.log('HHHHHHHhh', newprojet);
        ServiceProjet.save(newprojet)
            .then(rep => {
                setProjet([...projet, rep.data]);
                console.log('save projet', rep);
            })
    }

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
                                <h5>Liste des Projets DSI</h5>
                            </Col>
                            <Col sm={3}>
                                <Pagination size="lg">{items}</Pagination>
                            </Col>
                            <Col sm={1} className='mt-3'>
                                <AddProject handleSave={handleSave}></AddProject>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col sm={12} className="containerListProjet">
                                {
                                    projet ? (
                                        projet.map(projet => {
                                            // console.log('kokokoko boucle projet',projet)
                                            return <CardProjet projet={projet}></CardProjet>
                                        }))
                                        : (
                                            <div className='boxSpinner'>
                                                <center>
                                                    <BeatLoader className='p-5' color="#36d7b7" />
                                                </center>
                                                <h3>veuillez patienter😃</h3>
                                            </div>
                                        )
                                }
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row >
    )
}
