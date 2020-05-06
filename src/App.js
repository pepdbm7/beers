import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./components/Home";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);

export default withRouter(App);
