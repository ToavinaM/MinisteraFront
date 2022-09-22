import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
// animation
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { useNavigate } from 'react-router-dom';
// import Taches from '../Tache/Taches';

const styles = {
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}

// var moment = require('moment');
// const formatDate = "DD/MM/YYYY HH:mm";
export default function CardProjet({ projet }) {
    const navigate = useNavigate();

    //function
    const getTache = () => {
        navigate(`/tachesById/${projet.id}`);
    }


    return (
        <StyleRoot>
            <div style={styles.fadeIn} className='projet' onClick={() => getTache(projet.titre)} >
                <div className='head'>
                    <Row>
                        <center>
                            <h5>{projet.titre}</h5>
                        </center>
                    </Row>
                    <Row>
                        <Col>
                            <p>Debut: 22/08/22</p>
                        </Col>
                        <Col>
                            <p>Fin: 22/08/22</p>
                        </Col>
                    </Row>
                </div>

                <hr></hr>
                <p><strong>Status</strong>:
                    <Badge bg="danger">  Retard</Badge>
                </p>
                <p><strong>Avancement</strong>: 10%</p>
                <p><strong>Alerteur</strong>: dans 2 jours</p>
                <p><strong>Commentaires</strong>:<span className="visually-hidden">unread messages</span><Badge bg="primary">9</Badge> nouveaux </p>
                <span className="visually-hidden">unread messages</span>
                <p>
                    {/* <ProgressBar animated now={45} /> */}
                </p>
            </div>
        </StyleRoot>
    )
}
