import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useAxios from "axios-hooks";

import Home from "./components/Home/Home";
import GameWrapper from "./components/Game";

const App = () => {
  const [{ data, loading, error }] = useAxios("/auth/check");

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home user={data} />} />
        <Route path="/game" component={GameWrapper} />
      </Switch>
    </Router>
  );
};

export default App;
