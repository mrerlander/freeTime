import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Header = (props) => (
    <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>FreeTime</Navbar.Brand>
        <Nav className='mr-auto'>
            <Nav.Link href='#home'>My Calendar</Nav.Link>
            <Nav.Link href='#groups'>Groups</Nav.Link>
        </Nav>
        {props.loggedIn ?
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as <Button onClick={props.signOut} variant='outline-info'>{props.userName}</Button>
                </Navbar.Text>
            </Navbar.Collapse> :
            <Form inline>
                <FormControl onChange={props.handleInput} name='user' type='text' placeholder='Username' className='mr-sm-2'/>
                {/*<FormControl type='text' placeholder='Password' className='mr-sm-2'/>*/}
                <Button onClick={props.signIn} variant='outline-info' type='submit' value='submit'>Login</Button>
            </Form>}
    </Navbar>
);

export default Header;