const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Update Gallery ---------- **/
router.put('/', async (req, res) => {
    try{

        locationId = req.body.locationId
        artId = req.body.artId

        const sqlText =`
            UPDATE "artPieces"
                SET "galleryLocation" = $1
                    WHERE "id" = $2;
        `
        const sqlValues = [ locationId, artId ]
        const dbRes = await pool.query(sqlText, sqlValues);
    }catch (err) {
        console.error('Error in POST', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;