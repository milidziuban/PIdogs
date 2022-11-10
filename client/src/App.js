import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Landing from './components/Landing'
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

          <h1>Henry Dogs</h1>

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
