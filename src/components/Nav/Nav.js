import React from 'react'

import {
    Row,
    Col,
    Button
}

    from 'react-bootstrap';
import './nav.css'

export default function Nav() {
    return (
        <div className='navContainer' >
            <Row>
                <Col> <h1><img className="iconImg" src='./logo.png' ></img> Ministère</h1> </Col>
            </Row>
            <Row>
                <center>

                    <Button style={{ paddingTop: '15px', marginLeft: '-5px' }} className='buttonNav' href='/Dashboard' > <img className="ico" src='./home.png' ></img> {' '}
                        <strong style={{ marginTop: "10px" }}>DASHBOARD</strong> { }
                    </Button>
                </center>
            </Row>
            <hr></hr>
            <Row>
                <Col className='overF' sm={12}>
                    <div className="drop-box" >
                        <p href='/Dashboard' ><img className='logoNav' src='./projet.png' />Listes des Projets</p>
                        <p><img className='logoNav' src='./map.png' />Cartographier les projets</p>
                        <p><img className='logoNav' src='./roles.png' />Gestions des utilisateurs</p>
                        <p><img className='logoNav' src='./params.png' />Parametre de l'application</p>
                        {/* <ul>
                            <li>Liste</li>
                            <li>Bulletin</li>
                            <li>Inscription</li>
                            <li>Classe</li>
                            <li>Emplois du temps</li>
                        </ul>
                        <p><img className='logoNav' src='./money.png' />Frais</p> <ul> <li>Ecolage</li> <li>Bus</li> <li>Piscine</li> </ul> <p><img className='logoNav' src='./cantine.png' />Cantine</p> <p><img className='logoNav' src='./event.png' />Evénement</p> <p><img className='logoNav' src='./conference.png' />Professeur</p> <p><img className='logoNav' src='./group-chat.png' />Personnel</p> <p><img className='logoNav' src='./import.png' />Importer</p> <p><img className='logoNav' src='./document.png' />Documents</p> <p><img className='logoNav' src='./calendar-1.png' />Calendrier</p> <p><img className='logoNav' src='./envelope.png' />Mail</p> */}
                    </div>
                </Col>
            </Row>
        </div>
    )
}