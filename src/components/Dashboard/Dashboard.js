import React from 'react'
import { Row, Col, Button, Image } from 'react-bootstrap';

import './Dashboard.css';
import Nav from '../Nav/Nav';
import Header from '../header/Header';
// chart
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export default function Dashboard() {
    const mois = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const donuts = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Statistiques des <br>problèmes',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'pourcentage',
            innerSize: '50%',
            data: [
                ['Administration', 12],
                ['Financement', 32],
                ['Autre', 34]
            ]
        }]
    }
    const batton = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Proprietés des taches par mois'
        },
        // subtitle: {
        //     text: 'Detail Planning'
        // },
        xAxis: {
            categories: mois,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pourcentage %'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Pipeline',
            color: 'Red',
            // data: arrayRep['high']
            data: [2, 15, 14]
        }, {
            name: 'SADECK',
            // data: arrayRep['medium']
            data: [5, 2, 32]

        }, {
            name: 'TANAMASOANDRO',
            color: 'Green',
            // data: arrayRep['low']
            data: [17, 32, 52]
        }, {
            name: 'Motro',
            color: 'Yellow',
            data: [11, 7, 19]
        }
        ]
    };
    return (
        <Row className='container-fluid'>
            {/* ///////////////////////component include NAVIGATION */}
            <Col sm={2}>
                <Nav></Nav>
            </Col>
            {/* /////////////////CONTAINER */}
            <Col sm={10} className={'container'}>
                {/* //heder */}
                <Row>
                    <Header></Header>
                </Row>
                {/* //box statistique de sexe and stat general*/}
                <Row>
                    <Col sm={3}  >
                        <div className="stat-sexe">
                            <Row>
                                <Col>
                                    <div className={'box-logo'}>
                                        <div className={'logoLate'} style={{ backgroundColor: '#FFB400' }}>
                                            <center>
                                                <img className="iconStat" src='./late.png'></img>
                                            </center>
                                        </div>
                                        <p>Retard</p>
                                        <h2>12</h2>
                                    </div>
                                </Col>
                                <Col>
                                    <div>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={3}  >
                        <div className="stat-sexe">
                            <Row>
                                <Col>
                                    <div className={'box-logo'}>
                                        <div className={'logoLate'} style={{ backgroundColor: '#56CA00' }}>
                                            <center>
                                                <img className="iconStat" src='./late.png'></img>
                                            </center>
                                        </div>
                                        <p>En Avance</p>
                                        <h2>12</h2>
                                    </div>


                                </Col>
                                <Col>
                                    <div>
                                        {/* <BiTask style={{ width: "40%", height: "auto" }} /> */}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={6} className="stat-general" >
                        <Row>
                            <h5 style={{ color: 'grey' }}>Statistiques des Projets</h5>
                            <p>mois de : Juin </p>
                        </Row>
                        <Row>
                            {/* <div id='box-icon-stat'> */}
                            <Col sm={4}>
                                <Row>
                                    <Col sm={5}>

                                        <div className={'cadreImage'} style={{ backgroundColor: '#7367F0' }}>
                                            <center>
                                                <img className="iconStat" src='./task.png'></img>
                                            </center>
                                        </div>
                                        {/* test */}
                                    </Col>
                                    <Col sm={7}>
                                        <p style={{ fontSize: 'small' }}> Effectif</p>
                                        <h5 style={{ fontSize: 'small' }} >120</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Col sm={5}>

                                        <div className={'cadreImage'} style={{ backgroundColor: '#56CA00' }}>
                                            <center>
                                                <img className="iconStat" src='./done.png'></img>
                                            </center>
                                        </div>
                                        {/* test */}
                                    </Col>
                                    <Col sm={7}>
                                        <p style={{ fontSize: 'small' }}>Accomplie</p>
                                        <h5 style={{ fontSize: 'small' }}>15.3</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Col sm={5}>

                                        <div className={'cadreImage'} style={{ backgroundColor: '#FFB400' }}>
                                            <center>
                                                <img className="iconStat" src='./fail.png'></img>
                                            </center>
                                        </div>
                                        {/* test */}
                                    </Col>
                                    <Col sm={7}>
                                        <p style={{ fontSize: 'small' }}>   Innachevés</p>
                                        <h5 style={{ fontSize: 'small' }}>15.3</h5>
                                    </Col>
                                </Row>
                            </Col>

                            {/* </div> */}
                        </Row>
                    </Col>
                </Row>
                {/* /////////////////////1 et 2  */}
                <Row>
                    <Col sm={6}>
                        <div className="bas-sexe1">
                            <h5>Statistiques des problèmes</h5>
                            <HighchartsReact highcharts={Highcharts} options={batton} />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="bas-sexe2">
                            <h5>Statistiques des problèmes</h5>
                            <HighchartsReact highcharts={Highcharts} options={donuts} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="Urgence">
                        <h5>Urgent</h5>
                    </Col>
                </Row>
            </Col>

        </Row >
    )
}
