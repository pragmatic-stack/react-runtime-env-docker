import React from 'react';
import logo from './logo.svg';
import './App.css';
import {appConfig} from "./config/appConfig";

const Config: React.FC = () => {
    return <>{Object.entries(appConfig).map(([key, value]) => (<h2 key={key}>{key}: {value}</h2>))}</>
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Config/>
            </header>
        </div>
    );
}

export default App;
