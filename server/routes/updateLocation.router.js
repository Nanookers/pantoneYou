const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Update Gallery ---------- **/
router.put('/', async (req, res) => {
    try{

        locationId = req.body.locationId
        artId = req.body.artId
        activeStatus= req.body.activeStatus 
        console.log(activeStatus);

        const sqlText =`
            UPDATE "artPieces"
                SET "galleryLocation" = $1,
                    "galleryStatus" = $3
                        WHERE "id" = $2;
        `
        const sqlValues = [ locationId, artId, activeStatus ]
        const dbRes = await pool.query(sqlText, sqlValues);
    }catch (err) {
        console.error('Error in PUT Gallery Location', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;