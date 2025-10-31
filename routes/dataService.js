const express= require("express");
const router = express.Router();
const pool = require("../db");

router.post("/dataService", async (req, res)=>{
    const spName = req.query.call;
    const params = req.body;


    if(!spName)
        return res.status(400).json({error: "Missing call parameter in query"});
    try{

        const conn = await pool.getConnection();

        //Create prameter sp
        const values = Object.values(params);
        const paramSP = values.map(()=>'?').join(',');

        const [rows] = await conn.query(`CALL ${spName}(${paramSP})`, values);
        conn.release();
        res.json({
            recordsets: rows
        });
        

    }catch(err){
        res.status(500).json({error: 'SP EX:', message: err.message});
    }

})
module.exports = router