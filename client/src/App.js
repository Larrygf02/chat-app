import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Join}></Route>
        <Route exact path="/chat" component={Chat}></Route>
      </Router>
    </div>
  );
}

export default App;
