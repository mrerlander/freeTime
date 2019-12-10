import React from 'react';
import './day.css';
import {Col, Card, ListGroup} from 'react-bootstrap';
import format from 'date-fns/format';

const dateFormat = 'EEEE do';

const Day = props => (
    <Card className={'day-card'}>
        <Card.Header className={'text-center'}>{format(props.day, dateFormat)}</Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item action
                            onClick={props.handleClick} className={'text-center'} variant={props.free[0]}>Morning</ListGroup.Item>
            <ListGroup.Item action
                            onClick={props.handleClick} className={'text-center'} variant={props.free[1]}>Afternoon</ListGroup.Item>
            <ListGroup.Item action
                            onClick={props.handleClick} className={'text-center'} variant={props.free[2]}>Night</ListGroup.Item>
            </ListGroup>
        </Card>
);

export default Day;