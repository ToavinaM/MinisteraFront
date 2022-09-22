import React, { useState } from 'react'
import { Row, Col, Button, Image, Alert, FloatingLabel, Form } from 'react-bootstrap';
import './Signin.css';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
// import UserService from '../../service/UserService.js'
import { useNavigate } from 'react-router';

import { AuthService } from './Auth.service';

export default function Signup() {

    const [incorrecte, setincorrecte] = useState(false);
    //formulaire
    const [email, setmail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function submiSignup() {
        let data = { email, username, password };
        // console.log(data);
        if (email == '' || username == '' || password == '') {
            setError('remplire tout les champs!')
        }
        else {
            AuthService.signup(data)
                .then(rep => {
                    console.log('======>>>', rep.data);
                    let storage = {
                        id: rep.data.id,
                        email: rep.data.email,
                        roles: rep.data.roles,
                        accessToken: rep.data.accessToken,
                    }
                    // localStorage.setItem('users', JSON.stringify(storage));
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
    // catch (err) {
    //     alert('err  main error' + err);
    // }
    // let data = {
    //     mail,
    //     mdp
    // };
    /////////// mdp=> sha1
    // LoginService.login(data)
    //     .then(rep => {
    //         // console.log('rep');
    //         // navigate('/Dashboard');
    //     })
    //     .catch(err => {
    //         alert('error');
    //         // console.log(err);
    //     })


    // UserService.login(mail, mdp)
    //     .then(retour => {
    //         if (retour) {
    //             //redirection
    //             navigate('/Liste');
    //         }
    //         setincorrecte(true);
    //     }).catch(error => {
    //         alert("Some error in server Side");
    //         navigate('/Liste');
    //         //traitement de l'erreur et du component a afficher
    //     });

    // token = localStorage.setItem(token: );



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
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control onChange={(value) => setusername(value.target.value)} type="email" placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control onChange={(value) => setmail(value.target.value)} type="email" placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control onChange={(value) => setpassword(value.target.value)} type="password" placeholder="Password" />
                            </FloatingLabel>
                        </Col>
                        <br></br>
                        {error &&
                            <Alert className='my-input' key='danger' variant='danger'>
                                {/* This is a {variant} alert with{' '} */}
                                {/* <Alert.Link href="#">an example link</Alert.Link>. Give it a click if */}
                                {/* you like. */}
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
