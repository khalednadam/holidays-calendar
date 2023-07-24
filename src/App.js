import React from 'react';
import { Countries } from './features/Countries/Countries';
import { CalendarC } from './features/CalendarC/CalendarC';
import './App.css';
import { Header } from './components/Header';



function App() {
    return (
        <div className="App">
            <Header />
            <Countries />
            <CalendarC />
            
        </div>
    );
}

export default App;


