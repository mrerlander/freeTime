import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (

    <Router>
            <Route
                exact path='/'
                component={Home}
            />
    </Router>

);

export default App;
