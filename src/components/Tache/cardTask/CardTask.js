import React from 'react'
import './cardTask.css';
import { Button, Col, Row } from 'react-bootstrap';

// animation
import { pulse } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

import Badges from '../../Badges';
//modalupdate
import UpdateCard from './UpdateCard';
import SupprimerCard from './SupprimerCard';
import CommentCard from './CommentCard';
import Signaler from './Signaler';
var moment = require('moment');
const formatDate = "DD/MM/YYYY HH:mm";
moment().format();
const styles = {
    pulse: {
        animation: 'x 1s',
        animationName: Radium.keyframes(pulse, 'pulse')
    }
}

export default function CardTask({ tache, handleMove }) {

    //FUNCTION
    const dragStarted = (e, tache) => {
        console.log('drag are started', tache);
        e.dataTransfer.setData("tache", JSON.stringify(tache));
    }

    return (
        <StyleRoot>
            <div draggable onDragStart={(e) => dragStarted(e, tache)} style={styles.pulse} className='card' >
                <Row>
                    <Col>
                        <p>Priorités:<Badges description={tache.priority} /></p>
                    </Col>
                    <Col md="2" style={{ display: 'contents' }}>
                        <UpdateCard></UpdateCard>
                        <SupprimerCard></SupprimerCard>
                        <CommentCard></CommentCard>
                        <Signaler></Signaler>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p>{moment(tache.debut).format(formatDate)}</p>
                    </Col>
                    <Col>
                        <p>{moment(tache.fin).format(formatDate)}</p>
                    </Col>
                </Row>

                <Row>
                    <label>Déscription</label>
                    <p>{tache.description}</p>
                    <label>Output</label>
                    <p>{tache.output}</p>
                </Row>
                <Row>
                    {/* <Button onClick={handleMove}>Deplacer </Button> */}
                </Row>
            </div>
        </StyleRoot>

    )
}
