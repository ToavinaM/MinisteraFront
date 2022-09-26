import React from 'react'
import './cardTask.css';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';

// animation
import { flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

import Badges from '../../Badges';
//modalupdate
import UpdateCard from './UpdateCard';
import SupprimerCard from './SupprimerCard';
import CommentCard from './CommentCard';
import Signaler from './Signaler';
import Alarm from './Alarm';
var moment = require('moment');
const formatDate = "DD/MM/YYYY HH:mm";
moment().format();
const styles = {
    flipInX: {
        animation: 'x 1s',
        animationName: Radium.keyframes(flipInX, '')
    }
}

const getColor = (id) => {
    if (id === 1) return 'grey';
    if (id === 2) return 'green';
    if (id === 3) return 'red';
}
export default function CardTask({ tache, handleUpdate, handleDelete }) {

    //FUNCTION
    const dragStarted = (e, tache) => {
        console.log('drag are started', tache);
        e.dataTransfer.setData("tache", JSON.stringify(tache));
    }


    return (
        <StyleRoot>
            <div draggable onDragStart={(e) => dragStarted(e, tache)} style={styles.flipInX}  >

                <div style={{ borderLeft: `${getColor(tache.PrioriteId)} solid 8px` }} className='card'>

                    <Row >
                        <Col >
                            {/* <p>Priorités:{tache.PrioriteId}</p> */}
                        </Col>
                        <Col sm={2} style={{ display: 'contents' }}>
                            <UpdateCard handleUpdate={handleUpdate} />
                            <SupprimerCard handleDelete={handleDelete} tache={tache} />
                            <CommentCard></CommentCard>
                            {tache.estAlerteur ? (<Alarm></Alarm>) : (<p></p>)}
                        </Col>
                    </Row>

                    <Row >
                        <Col>
                            <p>{moment(tache.debut).format(formatDate)}</p>
                        </Col>
                        <Col>
                            <p>{moment(tache.fin).format(formatDate)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Déscription</label>
                            <p>{tache.description}</p>
                            <label>Output</label>
                            <p>{tache.output}</p>
                        </Col>
                        <Col>
                            <ProgressBar now={45} label={45} variant='info' />
                        </Col>
                    </Row>
                </div>

            </div>
        </StyleRoot >

    )
}
