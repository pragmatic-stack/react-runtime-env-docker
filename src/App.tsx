import React from 'react';
import logo from './logo.svg';
import './App.css';
import {env} from "./config/env";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>App Loader Url: {env.appLoaderUrl}</h1>
        <h2>Api Url: {env.apiUrl}</h2>
      </header>
    </div>
  );
}

export default App;
