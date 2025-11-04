const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("./routes/dataService");
const fileService = require('./routes/fileService');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use("/api/data", dataService);
app.use("/api/file", fileService);

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})

