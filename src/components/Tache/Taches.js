import './style.css';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {useDrop} from 'react-dnd'; 
import { Col, Row } from 'react-bootstrap';
import CardTask from './cardTask/CardTask';
import ModalAddTache from './ModalAddTache';
import Header from '../header/Header';
import TacheService from './Service';
import { HashLoader } from 'react-spinners'
import ServiceTask from './Service';
//route params
import { useParams } from 'react-router-dom'
// import AddTache from './ModalAddTache';
export default function Taches(props) {
    //paramas
    const { idProjet } = useParams();
    console.log(idProjet);
    //task formater
    const [todo, settodo] = useState(null);
    const [inProgress, setinProgress] = useState(null);
    const [doing, setdoing] = useState(null);
    const [nahazodata, setnahazodata] = useState(false);
    /////////nombre stat\
    const [nombreTodo, setnombreTodo] = useState(0);
    const [nombreProgress, setnombreProrgess] = useState(0);
    const [nombreDoing, setnombreDoing] = useState(0);

    //function==================================================
    const handleSave = (tache) => {
        tache.ProjetId = idProjet;
        TacheService.save(tache).then((rep) => {
            tache.StatutId = 1;
            settodo([...todo, tache]);
        }).catch(err => {
            console.log('tsy nisave Taches; cause:', err)
        })
    }

    const draginOver = (e) => {

        console.log('over')
        e.stopPropagation();
        e.preventDefault();

    }

    const dragDropped = (e, cyble) => {
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
    }
    useEffect(() => {
        TacheService.getTacheByIdProjet(idProjet)
            .then((rep) => {
                // console.log('====================================');
                // if (typeof rep.data.todo.length !== 'undefined') setnombreTodo(rep.data.todo.length);
                // if (typeof rep.data.inProgress.length !== 'undefined') setnombreProrgess(rep.data.inProgress.length);
                // if (typeof rep.data.doing.length !== 'undefined') setnombreDoing(rep.data.doing.length);
                // setTimeout(() => {
                settodo(rep.data.todo);
                setdoing(rep.data.doing);
                setinProgress(rep.data.inProgress);
                setnahazodata(true)
                // },2000);
            })
            .catch(err => {
                console.log(err);
            })
    }, [nahazodata])

    return (
        <>
            <Row>
                <Header style={{ position: 'sticki' }}></Header>
            </Row>
            <Row className='m-2 mt-5 '>

                <Col className='Todo' droppable onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'todo')}>
                    <Row className='bg-info'>
                        <Col className='m-auto'>
                            <h3>Todoss({nombreTodo})</h3>
                        </Col>
                        <Col md={3}>
                            <ModalAddTache handleSave={handleSave} />
                        </Col>
                    </Row>
                    {/* <div >  */}
                    {
                        todo ? (
                            todo.map(tache => {
                                return <CardTask tache={tache} />
                            })
                        ) : (
                            <center>
                                <HashLoader className='p-5' color="#36d7b7" />
                            </center>
                        )
                    }
                    {/* </div> */}
                </Col>

                <Col className='InProgress' droppable onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'progress')} >
                    {/* <Col className='InProgress' ref={drop}> */}
                    <center>
                        <h3>Ins progress({nombreProgress})</h3>
                    </center>

                    <div>
                        {
                            inProgress ? (
                                inProgress.map(tache => {
                                    return <CardTask tache={tache} />
                                })
                            ) : (
                                <center>
                                    <HashLoader className='p-5' color="#36d7b7" />
                                </center>
                            )
                        }
                    </div>
                </Col>

                <Col className='Doing' droppable onDragOver={e => draginOver(e)} onDrop={e => dragDropped(e, 'doing')}>
                    <center>
                        <h3>Doing({nombreDoing})</h3>
                    </center>
                    {
                        doing ? (
                            doing.map(tache => {
                                return <CardTask tache={tache} />
                            })
                        ) : (
                            <center>
                                <HashLoader className='p-5' color="#36d7b7" />
                            </center>
                        )
                    }
                </Col>
            </Row>
        </>
    );
}