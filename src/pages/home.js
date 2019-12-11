import React, {Component} from "react";
import {addMonths, getDaysInMonth, startOfMonth, subMonths, addDays} from "date-fns";
import isSameMonth from 'date-fns/isSameMonth'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import Header from '../components/header';
import {Row, Col, Container, Jumbotron} from "react-bootstrap";
import CalendarHeader from "../components/calendarHeader";
import Day from "../components/day";
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            loggedIn: false,
            currentMonth: new Date(),
            currentDay: new Date(),
            userData: [],
        }
    };

    getUserData() {
        if (this.state.loggedIn) {
            fetch('/api/userData?user=' + this.state.user, {
                method: 'Get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        this.setState({userData: [...this.state.userData, ...res.dates]});
                        this.setState({userGroups: res.groups});
                    }
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.loggedIn !== this.state.loggedIn) {
            this.getUserData();
        }
        if (prevState.user !== this.state.user) {
            this.setState({userData: []});
            this.getUserData();
        }
    }

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

    signIn = (e) => {
        e.preventDefault();
        this.setState({loggedIn: true});
    };

    signOut = (e) => {
        e.preventDefault();
        this.setState({loggedIn: false});
        this.setState({user: ""});
    };

    handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    };

    handleClick = (e) => {
        const regex = /(\w+)[^-]*$/;
        const date = e.target.parentNode.previousElementSibling.id;
        let time0;
        let time1;
        let time2;
        const currentSetting = e.target.classList[2].match(regex)[1] === 'success' ? 'danger' : 'success';
        if (e.target.previousElementSibling === null) {
            time0 = currentSetting;
            time1 = e.target.nextElementSibling.classList[2].match(regex)[1];
            time2 = e.target.nextElementSibling.nextElementSibling.classList[2].match(regex)[1];
        } else if (e.target.nextElementSibling === null) {
            time0 = e.target.previousElementSibling.previousElementSibling.classList[2].match(regex)[1];
            time1 = e.target.previousElementSibling.classList[2].match(regex)[1];
            time2 = currentSetting;
        } else {
            time0 = e.target.previousElementSibling.classList[2].match(regex)[1];
            time1 = currentSetting;
            time2 = e.target.nextElementSibling.classList[2].match(regex)[1];
        }
        e.target.classList[2] === 'list-group-item-success' ? e.target.classList.replace('list-group-item-success', 'list-group-item-danger') :
            e.target.classList.replace('list-group-item-danger', 'list-group-item-success');

        const removeEarlierDate = this.state.userData.filter((obj) => {
            return obj.date !== new Date(date).toISOString()
        });

        removeEarlierDate.push({date: new Date(date).toISOString(), times: [time0, time1, time2]});
        this.setState({userData: removeEarlierDate});

        fetch('/api/updateData', {
            method: 'Post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'userName': this.state.user,
                'userData': this.state.userData
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });

    };

    populateDays = () => {
        const dayArr = [];
        const days = getDaysInMonth(this.state.currentMonth);
        const monthStart = startOfMonth(this.state.currentMonth);
        const monthDates = this.state.userData.filter(date => isSameMonth(parseISO(date.date), monthStart));
        let variantData = ['success', 'success', 'success'];

        if (this.state.loggedIn) {
            if (this.state.userData.length === 0) {
                for (let i = 0; i < days; i++) {
                    dayArr.push(
                        <Day handleClick={this.handleClick} day={addDays(monthStart, i)} free={variantData}/>
                    );
                }
            } else {
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
            }
        }
        let key = 0;
        const dayCards = dayArr.map(function (item) {
            key++;
            return <Col key={key} className={'day-div d-flex flex-grow-0'}>{item}</Col>;
        });

        return dayCards;

    }

    render() {

        return (
            <div>
                <Header handleInput={this.handleInput} userName={this.state.user} signIn={this.signIn}
                        signOut={this.signOut} loggedIn={this.state.loggedIn}/>
                <Container fluid={true}>
                    {this.state.loggedIn ?
                        <div>
                            <CalendarHeader month={this.state.currentMonth} nextMonth={this.nextMonth}
                                            prevMonth={this.prevMonth}/>
                            <Row noGutters={true} className={'justify-content-start'}>
                                {this.populateDays()}
                            </Row>
                        </div> :
                        <Jumbotron className='text-center'>
                            <h1>Hello! Welcome to FreeTime</h1>
                            <p>
                                Please enter your username above to get started.
                            </p>
                        </Jumbotron>
                    }
                </Container>
            </div>
        )
    };
}

export default Home;