import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
// animation
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
                <div className='head' style={{ backgroundColor: projet.color }}>
                    <Row>
                        <center>
                            {/* //////gestion si pas de couleur */}
                            <h5 style={{ color: projet.color ? 'white' : 'black' }} > {projet.titre}</h5>
                        </center>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{ color: 'black' }}> {moment(projet.debut).format('DD/MM/YYY')}</p>
                        </Col>
                        <Col>
                            <p style={{ color: 'black' }}> {moment(projet.fin).format('DD/MM/YYY')}</p>
                        </Col>
                    </Row>
                </div>
                <div className='bodyCard'>
                    <p><Badge bg="success">en cours</Badge></p>
                    <p><strong>Avancement</strong>: 10%</p>
                    <p><strong>Region</strong>: Antananarivo</p>
                    <p><strong>Commentaires</strong>:<span className="visually-hidden">unread messages</span><Badge bg="primary">9</Badge> nouveaux </p>
                    <span className="visually-hidden">unread messages</span>
                </div>
            </div>
        </StyleRoot >
    )
}
