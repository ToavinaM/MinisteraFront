import './style.css';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CardTask from './cardTask/CardTask';
import ModalAddTache from './ModalAddTache';
import TacheService from './Service';
import { FadeLoader } from 'react-spinners'
import ServiceTask from './Service';
//route params
import { useNavigate, useParams } from 'react-router-dom'
import ModalTacheEnRetard from './ModalTacheEnRetard';
import useSound from 'use-sound';
import pop from '../sound/create.mp3'
const styleOver = {
    // transform: 'scale(0.99)',
    backgroundColor: '#a5c7f9',
    // boxShadow: '5px 8px 20px 3px #5f5d5d',
    transitionDuration: '1.4s'
}

const options = [
    {
        id: 1,
        name: "Bas",
        // color: "blue"
    },
    {
        id: 2,
        name: "Moyen",
        // color: "#0ff10f"
    },
    {
        id: 3,
        name: "Urgent",
        // color: "red"
    },
];
export default function Taches(props) {
    //filter
    const [PrioriteId, setpriority] = useState(1);
    //paramas
    const { idProjet } = useParams();
    // console.log(idProjet);
    //task formater
    const [todo, settodo] = useState(null);
    const [inProgress, setinProgress] = useState(null);
    const [doing, setdoing] = useState(null);
    const [retard, setretard] = useState([]);

    const [nahazodata, setnahazodata] = useState(false);
    /////////nombre stat\
    const [nombreTodo, setnombreTodo] = useState(0);
    const [nombreProgress, setnombreProrgess] = useState(0);
    const [nombreDoing, setnombreDoing] = useState(0);
    //function==================================================
    //passage de fonction via props

    const handleSave = (tache) => {
        tache.ProjetId = idProjet;
        TacheService.save(tache).then((rep) => {
            settodo([...todo, rep.data]);
        }).catch(err => {
            console.log('tsy nisave Taches; cause:', err)
        })
    }

    const handleUpdate = (tache) => {
        tache.ProjetId = idProjet;
        TacheService.update(tache).then((rep) => {
            console.log('ILAY IZY', tache.StatutId);
            switch (tache.StatutId) {
                case 1:
                    console.log('HUUH', tache)
                    // todo.slice()
                    console.log(todo.filter(t => t.id !== tache.id));
                    // if()
                    // settodo([...todo, { tache }])
                    break;
                case 2:
                    console.log('HUUH', rep)

                    setinProgress(inProgress.filter(t => t.id !== tache.id));
                    setinProgress(rep);
                    break;
                case 3:
                    console.log('HUUH', rep)

                    setdoing(doing.filter(t => t.id !== tache.id));
                    setdoing(rep);
                    break;
                default:
                    break;
            }
        }).catch(err => {
            console.log('somme error in server side:', err)
        })
    }

    const handleDelete = (tache) => {
        console.log('delete', tache.StatutId);
        TacheService.delete({ id: tache.id })
            .then(rep => {
                switch (tache.StatutId) {
                    case 1:
                        settodo(todo.filter(t => t.id !== tache.id));
                        break;
                    case 2:
                        setinProgress(inProgress.filter(t => t.id !== tache.id));
                        break;
                    case 3:
                        setdoing(doing.filter(t => t.id !== tache.id));
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const [overTodo, setoverTodo] = useState(false);
    const [overProgress, setoverProgress] = useState(false);
    const [overDoing, setoverDoing] = useState(false);
    const [play] = useSound(pop);
    const draginOver = (e) => {
        // console.log('over')
        // play();
        e.stopPropagation();
        e.preventDefault();
        // alert('test')
        console.log(e.target.className);
        switch (e.target.className) {
            case 'Todo col':
                setoverTodo(true);
                break;
            case 'InProgress col':
                setoverProgress(true);
                break;
            case 'Doing col':
                setoverDoing(true);
                break;
            default:
                break;
        }
    }

    const dragDropped = (e, cyble) => {
        play();
        let data = e.dataTransfer.getData('tache');
        const tache = JSON.parse(data);
        // console.log(cyble);
        if (tache.StatutId === 1) { //mila alefa any am in Progress
            if (cyble === "progress") {
                const newTodo = todo.filter(t => t.id !== tache.id);
                settodo(newTodo);
                setnombreTodo(newTodo.length);
                tache.StatutId = 2;
                setinProgress([...inProgress, tache]);
                setnombreProrgess(inProgress.length);
                let data = { StatutId: 2, id: tache.id };
                ServiceTask.update(data);
            }
            else if (cyble === "doing") {
                const newTodo = todo.filter(t => t.id !== tache.id);
                settodo(newTodo);
                setnombreTodo(newTodo.length);
                tache.StatutId = 3;
                setdoing([...doing, tache]);
                setnombreDoing(doing.length);
                let data = { StatutId: 3, id: tache.id };
                ServiceTask.update(data);
            }
        }
        ////////////////////////////////////////////////////////progress//////////////////////////////
        if (tache.StatutId === 2) { //mila alefa any am in Progress
            if (cyble === "todo") {
                const newProgress = inProgress.filter(t => t.id !== tache.id);
                setinProgress(newProgress);
                setnombreProrgess(newProgress.length);
                tache.StatutId = 1;
                settodo([...todo, tache]);
                setnombreTodo(todo.length);
                let data = { StatutId: 1, id: tache.id };
                ServiceTask.update(data);
            }
            if (cyble === "doing") {
                const newProgress = inProgress.filter(t => t.id !== tache.id);
                setinProgress(newProgress);
                setnombreProrgess(newProgress.length);
                tache.StatutId = 3;
                setdoing([...doing, tache]);
                setnombreDoing(doing.length);
                let data = { StatutId: 3, id: tache.id };
                ServiceTask.update(data);
            }
        }
        /////////////////////////////////////////////////////////////////////doing/////////////////
        if (tache.StatutId === 3) {
            if (cyble === "progress") {
                const newdoing = doing.filter(t => t.id !== tache.id);
                setdoing(newdoing);
                setnombreDoing(newdoing.length);
                tache.StatutId = 2;
                setinProgress([...inProgress, tache]);
                setnombreProrgess(inProgress.length);
                let data = { StatutId: 2, id: tache.id };
                ServiceTask.update(data);
            }
            else if (cyble === "todo") {
                const newdoing = doing.filter(t => t.id !== tache.id);
                setdoing(newdoing);
                setnombreDoing(newdoing.length);
                tache.StatutId = 1;
                settodo([...todo, tache]);
                setnombreTodo(todo.length);
                let data = { StatutId: 1, id: tache.id };
                ServiceTask.update(data);
            }
        }
        setoverTodo(false);
        setoverProgress(false);
        setoverDoing(false);
    }

    useEffect(() => {
        TacheService.getTacheByIdProjet(idProjet)
            .then((rep) => {
                if (typeof rep.data.todo.length !== 'undefined') setnombreTodo(rep.data.todo.length);
                if (typeof rep.data.inProgress.length !== 'undefined') setnombreProrgess(rep.data.inProgress.length);
                if (typeof rep.data.doing.length !== 'undefined') setnombreDoing(rep.data.doing.length);
                setTimeout(() => {
                    settodo(rep.data.todo);
                    setretard(rep.data.retard);
                    setdoing(rep.data.doing);
                    setinProgress(rep.data.inProgress);
                    setnahazodata(true)
                }, 500);
            })
            .catch(err => {
                console.log(err);
            })
    }, [nahazodata])
    const navigation = useNavigate()
    return (
        <>
            {/* //////////FILTRE//////////// */}
            <ModalTacheEnRetard retard={retard} handleUpdate={handleUpdate} handleDelete={handleDelete} />

            <Row>
                <div className='filtre'>
                    <Col sm={12} id={'header'}>
                        {/* //icon gauche */}
                        <Col sm={3} id={'filtregauche'}>
                            <div className="icons">
                                <img onClick={() => navigation('/projets')} className="ministeraSary" src='../ministere.png'></img>
                            </div>
                            <div className="m-4 mt-5">
                                <p>Ministera Ny Rano</p>
                                <p> </p>
                            </div>
                            <div className="icons">
                                <img className="iconImg" src='./envelope.png'></img>
                            </div>
                        </Col>

                        {/* //icon droite */}
                        <Col sm={9} id={'filtredroite'}>
                            <div className='m-3'>
                                <Form.Select values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ width: "145px", padding: "10px" }}>
                                    {options.map(option => {
                                        return (
                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className='m-3'>
                                <Form.Select className='drop' values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ width: "145px", padding: "10px" }}>
                                    {options.map(option => {
                                        return (
                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className='m-3'>
                                <Form.Select className='drop' values={{ options }} onChange={(rep) => { setpriority(rep.target.value); }} style={{ width: "145px", padding: "10px" }}>
                                    {options.map(option => {
                                        return (
                                            <option style={{ color: option.color }} key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="m-2">
                                <input className='findBarTask'></input>
                            </div>
                            {/* <Button>Rechercher</Button> */}
                        </Col>
                    </Col>
                </div >
            </Row >
            {/* ////////////////////// */}
            < Row className='m-2  ' >
                <Col style={overTodo ? styleOver : {}} className='Todo' droppable='true' onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'todo')}>
                    <Row>
                        <Col className='m-auto'>
                            <h3>Todos({nombreTodo})</h3>
                        </Col>
                        <Col md={3}>
                            <ModalAddTache handleSave={handleSave} />
                        </Col>
                    </Row>
                    {
                        todo ? (
                            todo.map(tache => {
                                return <CardTask key={tache.id} tache={tache} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                            })
                        ) : (
                            <center className='mt-5'>
                                <FadeLoader className='p-5' color="#36d7b7" />
                            </center>
                        )
                    }
                </Col>

                <Col style={overProgress ? styleOver : {}} className='InProgress' droppable onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'progress')} >
                    <center>
                        <h3>In progress({nombreProgress})</h3>
                    </center>
                    {/* <Col className='InProgress' ref={drop}> */}

                    <div>
                        {
                            inProgress ? (
                                inProgress.map(tache => {
                                    return <CardTask key={tache.id} tache={tache} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                                })
                            ) : (
                                <center className='mt-5'>
                                    <FadeLoader className='p-5' color="#36d7b7" />
                                </center>
                            )
                        }
                    </div>
                </Col>


                <Col style={overDoing ? styleOver : {}} className='Doing' droppable onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'doing')}>
                    <center>
                        <h3>Doing({nombreDoing})</h3>
                    </center>
                    {
                        doing ? (
                            doing.map(tache => {
                                return <CardTask key={tache.id} tache={tache} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                            })
                        ) : (
                            <center className='mt-5'>
                                <FadeLoader className='p-5' color="#36d7b7" />
                            </center>
                        )
                    }
                </Col>


            </Row >
        </>
    );
}