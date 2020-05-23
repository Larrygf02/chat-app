import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

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
