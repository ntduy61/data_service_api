const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("./routes/dataService");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use("/api/data", dataService);

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})

