import React from "react";
import { Order } from "./components/Order";
import { Orders } from "./components/Orders";
import { Login } from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router"
import { UserProvider } from "./contexts/User";

function App() {
  return (
    <div className="App">
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Merchant</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Login</a></li>
            <li><a href="/order">Order</a></li>
            <li><a href="/orders">Orders</a></li>
          </ul>
        </div>
      </nav>
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/order" component={Order} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
