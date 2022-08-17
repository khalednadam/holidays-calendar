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


// try{
//     const response = await fetch(`http://holiday-calendar-backend.herokuapp.com/${countryCode}`);
//     if(!response.ok){
//         throw new Error(`Error: ${response.status}`);
//     }
//     const json = await response.json();
//     return json;
// }catch(err){
//     console.log(err);
// }