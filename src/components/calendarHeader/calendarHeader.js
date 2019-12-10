import React from 'react';
import format from 'date-fns/format';
import {Row, Col, Button} from 'react-bootstrap';

const dateFormat = 'MMMM yyyy';

const CalendarHeader = props => (

    <Row noGutters={true}>
        <Col xs={1}>
            <Button variant={'secondary'} onClick={props.prevMonth}>Prev</Button>
        </Col>
        <Col xs={9} className={'text-center'}>
        <h5>
          {format(props.month, dateFormat)}
        </h5>
        </Col>
        <Col xs={1} className={'justify-content-end'}>
            <Button variant={'secondary'} onClick={props.nextMonth}>Next</Button>
        </Col>
    </Row>
);


export default CalendarHeader;