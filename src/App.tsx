import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home';
import GameWrapper from './components/Game';
import Instructions from './components/Instructions/Instructions';
import EndGame from './components/EndGame/EndGame';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/game'>
                    <GameWrapper />
                </Route>
                <Route path='/instructions'>
                    <Instructions />
                </Route>
                <Route path='/gameover'>
                    <EndGame />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;