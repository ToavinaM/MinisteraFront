import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './nav.css'

export default function Nav() {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigation = useNavigate();
    return (
        <div className='navContainer' >
            <Row >
            </Row>
            <Col>
                <center>
                    <h5> <img className="ministeraNav" src='./ministere.png' ></img> Suivi Opérationnel</h5>
                </center>
            </Col>
            <Row>
                <center>
                    {
                        user &&
                        <Button style={{ paddingTop: '15px', marginLeft: '-5px' }} className='buttonNav' onClick={() => navigation('/Dashboard')} >
                            {/* <img className="ico mb-2" src='./projet.png' ></img> {' '} */}
                            <strong style={{ marginTop: "10px" }}>DASHBOARD</strong> { }
                        </Button>
                    }
                </center>
            </Row>
            <hr></hr>
            <Row>
                <Col className='overF' md={12}>
                    <div className="drop-box" >
                        {user ? (
                            <>
                             
                                <p className='lienNav' onClick={() => navigation('/projets')}  >
                                    <img onClick={() => navigation('/projets')} className='logoNav' src='./projet.png' />Projets
                                </p>
                                <p className='lienNav' onClick={() => navigation('/map')}><img onClick={() => navigation('/map')} className='logoNav' src='./Map.png' />Localisation</p>
                                <p className='lienNav' onClick={() => navigation('/GestionUser')}><img onClick={() => navigation('/Dashboard')} className='logoNav' src='./roles.png' />Utilisateurs</p>
                                <p className='lienNav' onClick={() => navigation('/parametre')}><img onClick={() => navigation('/parametre')} className='logoNav' src='./params.png' />Paramètre </p>
                                <p className='lienNav' onClick={() => navigation('/profil')}><img onClick={() => navigation('/parametre')} className='logoNav' src='./compte.png' />Profil</p>
                                <p className='lienNav' onClick={() => navigation('/cartographie_meah')}><img onClick={() => navigation('/cartographie_meah')} className='logoNav' src='./map.png' />Assainissement</p>
                            </>

                        )
                            : (
                                <p className='lienNav' onClick={() => navigation('/cartographie_meah')}><img onClick={() => navigation('/cartographie_meah')} className='logoNav' src='./compte.png' />Assainissement</p>

                            )}


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
        </div >
    )
}