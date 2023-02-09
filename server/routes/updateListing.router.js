const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Add a Gallery ---------- **/

router.post( '/', async (req, res) => {
    try{
        const galleryName = req.body.galleryName
        const galleryAddress = req.body.galleryAddress
        const galleryCut = req.body.galleryCut
        
        const sqlText =`
            INSERT INTO "location" ("galleryName", "galleryAddress", "galleryCut")
                VALUES ($1, $2, $3)
                    RETURNING "id";
        `
        const sqlValues = [ galleryName,  galleryAddress, galleryCut ]
        const dbRes = await pool.query(sqlText, sqlValues);
        res.send(dbRes.rows)

    }catch (err) {
        console.error('Error in POST', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;



