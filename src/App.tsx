import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RuntimeEnvironment} from "./config/RuntimeEnvironment";

const env = new RuntimeEnvironment(
    {
        REACT_APP_ENV: process.env.REACT_APP_ENV || '',
        REACT_APP_API_URL: process.env.REACT_APP_API_URL || '',
        REACT_APP_APP_LOADER_URL: process.env.REACT_APP_APP_LOADER_URL || ''
    }, {
        logConfigState: true,
        logMethod: 'warn'
    }
);

const Config: React.FC = () => <>{Object.entries(env.config).map(
    ([key, value]) => (
        <h2 key={key}>{key}: {value}</h2>
    )
)}</>


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
