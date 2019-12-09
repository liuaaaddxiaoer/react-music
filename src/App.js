import React from 'react';
import Home from './home'
import {Route, HashRouter, Redirect } from 'react-router-dom';


function App() {

  return (
    <HashRouter>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Redirect to="/home"/>
    </HashRouter>
    
  );
}

export default App;
