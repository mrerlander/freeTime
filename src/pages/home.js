import React, {Component} from "react";
import {addMonths, getDaysInMonth, startOfMonth, subMonths, addDays, isThisMonth} from "date-fns";
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import Header from '../components/header';
import {Row, Col, Container} from "react-bootstrap";
import CalendarHeader from "../components/calendarHeader";
import Day from "../components/day";
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "Mike",
            currentMonth: new Date(),
            currentDay: new Date(),
            userData: [],
            userGroups: []
        }
    };

    componentDidMount() {
        fetch('http://localhost:3001/userData?user=' + this.state.user, {
            method: 'Get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({userData: res.dates});
                this.setState({userGroups: res.groups});
            });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    handleClick = (e) => {
        console.log(e.target);
    };

    render() {
        const dayArr = [];
        const days = getDaysInMonth(this.state.currentMonth);
        const monthStart = startOfMonth(this.state.currentMonth);
        const monthDates = this.state.userData.filter(date => isThisMonth(parseISO(date.date)));
        let variantData = ['success', 'success', 'success'];
        for (let i = 0; i < days; i++) {
            for (let j = 0; j < monthDates.length; j++) {
                if (formatISO(addDays(monthStart, i)) === formatISO(parseISO(monthDates[j].date))) {
                    variantData = monthDates[j].times;
                }
            }

            dayArr.push(
                <Day handleClick={this.handleClick} day={addDays(monthStart, i)} free={variantData}/>
            );

            variantData = ['success', 'success', 'success'];
        }

        const dayCards = dayArr.map(function (item) {
            return <Col className={'day-div d-flex flex-grow-0'}>{item}</Col>;
        });


        return (
            <div>
                <Header/>
                <Container fluid={true}>
                    <CalendarHeader month={this.state.currentMonth} nextMonth={this.nextMonth}
                                    prevMonth={this.prevMonth}/>
                    <Row noGutters={true} className={'justify-content-start'}>
                        {dayCards}
                    </Row>
                </Container>
            </div>
        )
    };
}

export default Home;