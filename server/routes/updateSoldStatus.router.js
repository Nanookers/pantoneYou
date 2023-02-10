const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Updates the Sold Status | Location it was Sold---------- **/

router.put('/', async (req, res) => {
    try{
        const artId = req.body.artId
        const locationSold = req.body.locationSold
        
        const sqlQuery = `
        UPDATE "artPieces"
            SET "soldStatus" = true,
                 "soldDate" = NOW()
                    WHERE "id" = ${artId};
    `
    const dbResTwo = await pool.query(sqlQuery);  
    
        const sqlText = `
            UPDATE "soldPieces"
                SET "locationSold" = $1
                    WHERE "artId" = $2;
        `
        const sqlValues = [ locationSold, artId ]
        const dbRes = await pool.query(sqlText, sqlValues);  
        

    }catch (err) {
        console.error('Error in PUT soldStatus', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;