import React, { useState } from 'react'
import { Row, Col, Button, Image, Alert, FloatingLabel, Form } from 'react-bootstrap';
import './Signin.css';
// import UserService from '../../service/UserService.js'
import { useNavigate } from 'react-router';

import { AuthService } from './Auth.service';

export default function Signup() {

    //formulaire
    const [email, setmail] = useState('');
    const [username, setusername] = useState('');
    // const [password, setpassword] = useState('');

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function submiSignup() {
        let data = { email, username };
        // console.log(data);
        if (email == '' || username == '') {
            setError('remplire tout les champs!')
        }
        else {
            AuthService.signup(data)
                .then(rep => {
                    navigate('/');
                })
                .catch(err => {
                    //connnection reussie mais user non reconnue
                    if (err.response.data.message) {
                        setError(err.response.data.message);
                    }
                    // connection perdu
                    else {
                        console.log('XXXXXXXXXXXXXXXX', err);
                    }
                })
        }
    }

    return (
        <Row>
            <Col sm={8}>
                <center>
                    <img src='./ministere.png' style={{ width: '60%', height: '60%' }}></img>
                </center>
            </Col>
            <Col sm={4}>
                <div className="formulaire-container">
                    <div className="logo">
                        <h1>Inscription </h1>
                        <br></br>
                    </div>

                    {/* <div className='slogon'>
                        <h3>Inscription</h3>
                    </div> */}

                    <div className='formulaire-body'>

                        <Col sm={8} className='m-auto'>
                            <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
                                <Form.Control onChange={(value) => setusername(value.target.value)} type="email" placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control onChange={(value) => setmail(value.target.value)} type="email" placeholder="name@example.com" />
                            </FloatingLabel>

                        </Col>
                        <br></br>
                        {error &&
                            <Alert className='my-input' key='danger' variant='danger'>
                                {error}
                            </Alert>
                        }
                        <br />
                        <Button onClick={submiSignup} className='button'>Signup</Button>
                    </div>


                </div>

            </Col>
        </Row >
    )
}
