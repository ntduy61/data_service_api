const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("./routes/dataService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/data", dataService);


app.listen("3443", ()=>{
    console.log("Server running at http://localhost:3443");
})

