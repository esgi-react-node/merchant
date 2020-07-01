import React from "react";
import Order from "./components/Order";
import Transaction from "./components/Transaction";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";

function App() {
  return (
    <div className="App">
      <nav>
        <li><a href="/order">Order</a></li>
        <li><a href="/transactions">Transactions</a></li>
      </nav>
      <Router>
        <Switch>
          <Route path="/order" component={Order} />
          <Route path="/transactions" component={Transaction} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
