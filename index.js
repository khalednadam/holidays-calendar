const PORT = process.env.PORT || 8000;
const express = require('express');
require('dotenv').config();
const fetch = require("node-fetch");

const app = express();

const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.get('/', async (req, res) =>{
    try{
        const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.REACT_APP_CALENDARIFIC_API_KEY}&country=PK&year=2022`);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        res.json(json);
        }catch(err){
            console.log(err);
        }
});





app.listen(PORT, () => {
    console.log(`Backend is running on PORT: ${PORT}`);
});