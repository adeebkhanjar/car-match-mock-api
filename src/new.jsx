import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <p>
            <Link className="link" to="/">
              Home
            </Link>
          </p>
          <p>
            <Link className="link" to="/about">
              Cars
            </Link>
          </p>
          <p>
            <Link className="link" to="/users">
              Users
            </Link>
          </p>
          <img src={logo} className="App-logo" alt="logo" />
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>cars</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
