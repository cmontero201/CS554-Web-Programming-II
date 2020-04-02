import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Landing from './components/Landing';
import Pokemon from './components/Pokemon';
import Berries from './components/Berries';
import Machines from './components/Machines';
import NotFound from './components/NotFound'
import PokemonDetail from './components/PokemonDetail';
import BerryDetail from './components/BerryDetail';
import MachineDetail from './components/MachineDetail';
import Logo from './img/Pokémon_logo.png';
import './App.css';

function App() {
  
  return (
    <Router>
      <Container className = "App">
        <header className = 'App-header'>
          <a href = '/'>
            <img id = 'logo' alt = 'logo' src = {Logo} />
          </a>
        </header>
        <Switch>
          <Route exact path = '/' component = {Landing} /> 
          <Route path = '/pokemon/page/:page' component = {Pokemon} />
          <Route exact path = '/pokemon/:id' component = {PokemonDetail} />
          <Route path = '/berries/page/:page' component = {Berries} />
          <Route path = '/berries/:id' component = {BerryDetail} />
          <Route path = '/machines/page/:page' component = {Machines} />
          <Route path = '/machines/:id' component = {MachineDetail} />
          <Route path = "*" component = {NotFound} status = {404} />
        </Switch>
      </Container>    
    </Router>
  );

};

export default App;
