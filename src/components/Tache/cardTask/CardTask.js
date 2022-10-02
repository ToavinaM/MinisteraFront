import React from 'react'
import './cardTask.css';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';

// animation
import { flipInX } from 'react-animations'
import Radium, { StyleRoot } from 'radium';

//modalupdate
import UpdateCard from './UpdateCard';
import SupprimerCard from './SupprimerCard';
import CommentCard from './CommentCard';
// import Signaler from './Signaler';
import Alarm from './Alarm';
import SousTache from './SousTache';
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



{/* <ProgressBar now={(((new Date() - tache.debut) * 100) / (tache.fin - tache.debbut)) / 100} label={(((new Date() - tache.debut) * 100) / (tache.fin - tache.debbut)) / 100} variant='info' /> */ }
export default function CardTask({ tache, handleUpdate, handleDelete, retard }) { //ilay retard no migerer ny suppr sy ipdate

    // console.log('HHHHHHHHHHHHHHHHhhh', new Date());
    // console.log('HHHHHHHHHHHHHHHHhhh', moment(tache.debut)._d);
    console.log('HHHHHHHHHHHHHHHHhhh',
        ((new Date() - moment(tache.debut)._d) * 100) / (moment(tache.fin)._d - moment(tache.debut)._d) / 100
    );

    //FUNCTION
    const dragStarted = (e, tache) => {
        console.log('drag are started', tache);
        e.dataTransfer.setData("tache", JSON.stringify(tache));
    }
    // console.log('ato am card', tache);


    return (
        <StyleRoot>
            <div draggable onDragStart={(e) => dragStarted(e, tache)} style={styles.flipInX}  >
                <div style={{ borderLeft: `${getColor(tache.PrioriteId)} solid 8px` }} className='card'>
                    <Row >
                        <Col >
                            {/* <p>Priorités:{tache.PrioriteId}</p> */}
                        </Col>
                        <Col sm={2} style={{ display: 'contents' }}>
                            <UpdateCard retard={retard} handleUpdate={handleUpdate} tache={tache} />
                            {retard ? (<p></p>) : (<SupprimerCard handleDelete={handleDelete} tache={tache} />)}
                            <CommentCard tache={tache} />
                            <SousTache tache={tache} />
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
                            <ProgressBar now={(((new Date() - tache.debut) * 100) / (tache.fin - tache.debbut)) / 100} label={(((new Date() - tache.debut) * 100) / (tache.fin - tache.debbut)) / 100} variant='info' />
                        </Col>
                    </Row>
                </div>

            </div>
        </StyleRoot >

    )
}
