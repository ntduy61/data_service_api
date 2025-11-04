const express= require("express");
const router = express.Router();
const dbService = require("../db/dbFactory");

router.post("/dataService", async (req, res)=>{
    const spName = req.query.call;
    const params = req.body || {};


    if(!spName)
        return res.status(400).json({error: "Missing call parameter in query"});
    try{

        const result = await dbService.executeSP(spName, params);
        res.json({
            recordsets: result
        });
        
    }catch(err){
        res.status(500).json({error: 'SP EX:', message: err.message});
    }

})
module.exports = router