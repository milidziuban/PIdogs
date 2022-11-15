import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Landing from './components/Landing'
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Route path='/home'>
          <NavBar />
        </Route>

        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

      </div>
    </BrowserRouter>

  );
}

export default App;
