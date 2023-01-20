import React from 'react';
import logo from './logo.svg';
import './App.css';
import {env} from "./config/env";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>App Loader Url: {env.REACT_APP_APP_LOADER_URL}</h1>
        <h2>Api Url: {env.REACT_APP_API_URL}</h2>
      </header>
    </div>
  );
}

export default App;
