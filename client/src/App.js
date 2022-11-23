import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Landing from './components/Landing'
import Home from './components/Home';
import NavBar from './components/NavBar';
import CreaDog from './components/Create'
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Route exact path='/home'>
          <NavBar />
        </Route>

        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path='/create'>
          <CreaDog />
        </Route>

        <Route exact path='/home/:id'>
          <Detail />
        </Route>


      </div>
    </BrowserRouter>

  );
}

export default App;
