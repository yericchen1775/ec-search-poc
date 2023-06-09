import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Dashboard = () => {
    
    return (
      <>
       <Jumbotron>
        <div className="row">
            <div className="col-md-6">
                Name:
            </div>
            <div className="col-md-6">
                First Last
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                Age:
            </div>
            <div className="col-md-6">
                99
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                Occupation:
            </div>
            <div className="col-md-6">
               
            </div>
        </div>
        </Jumbotron>
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Project 1
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Project1 description</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Project 2
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>Project2 description</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Project 3
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>Project3 description</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </>
    )
}

export default Dashboard