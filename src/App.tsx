import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createConfig } from "./config/Config";

const config = createConfig(
    {
        REACT_APP_ENV: process.env.REACT_APP_ENV || '',
        REACT_APP_API_URL: process.env.REACT_APP_API_URL || '',
        REACT_APP_APP_LOADER_URL: process.env.REACT_APP_APP_LOADER_URL || ''
    }, {
        logConfig: process.env.NODE_ENV === 'development',
        logConfigHealth: true
    }
);

const Config: React.FC = () => <>{Object.entries(config.env).map(
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
