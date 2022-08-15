const PORT = process.env.PORT || 8000;
const express = require('express');
require('dotenv').config();
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");

app.use(cors());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));
    app.get('*', (req, res) =>{
        req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}
app.get('/:countryCode', async (req, res) =>{
    try{
        const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.REACT_APP_CALENDARIFIC_API_KEY}&country=${req.params.countryCode}&year=2022`);
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