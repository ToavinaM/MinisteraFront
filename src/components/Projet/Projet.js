import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';

import './Projet.css';
import Nav from '../Nav/Nav';
import Header from '../header/Header';
//component
import AddProject from './AddProjet';
import CardProjet from './CardProjet';
//service
import ServiceProjet from './Projet.service';
//redux
import { RiseLoader } from 'react-spinners';

export default function Projet() {
    const [projet, setProjet] = useState(null);
    useEffect(() => {
        document.title = 'Projet DSI';
        ServiceProjet.getAll()
            .then(rep => {
                setTimeout(() => {
                    setProjet(rep.data);
                }, 600);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    //FUNCTION
    const handleSave = (newprojet) => {
        ServiceProjet.save(newprojet)
            .then(rep => {
                setProjet([...projet, newprojet]);
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
                            <Col sm={2}>
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
                                                    <RiseLoader className='p-5' color="#36d7b7" />
                                                </center>
                                                <h3>veuillez patienter 😃 </h3>
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
