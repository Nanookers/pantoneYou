const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Update with and Old Gallery ---------- **/

router.put( '/', async (req, res) => {
    try{
        const locationUpdate = req.body.locationId
        const artId = req.body.artId
        const sqlText =`
                UPDATE "artPieces"
                    SET "galleryLocation" = $1,
                        "galleryStatus" = true  
                        WHERE "id" = $2
                        RETURNING *;
        `
        const sqlValues = [ locationUpdate, artId ]
        const dbRes = await pool.query(sqlText, sqlValues);
        res.send(dbRes.rows)

    }catch (err) {
        console.error('Error in POST', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;