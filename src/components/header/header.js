import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Header = () => (
    <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>FreeTime</Navbar.Brand>
        <Nav className='mr-auto'>
            <Nav.Link href='#home'>My Calendar</Nav.Link>
            <Nav.Link href='#groups'>Groups</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type='text' placeholder='Username' className='mr-sm-2'/>
            <FormControl type='text' placeholder='Password' className='mr-sm-2'/>
            <Button variant='outline-info'>Login</Button>
        </Form>
    </Navbar>
);

export default Header;