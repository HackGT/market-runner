import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home'
import Game from './components/Game';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/game'>
                    <Game />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;