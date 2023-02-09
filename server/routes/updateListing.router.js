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
        VALUES ($1, $2, $3);
        `
        const sqlValues = [galleryName,  galleryAddress, galleryCut ]
        const dbRes = await pool.query(sqlText, sqlValues);
    }catch (err) {
        console.error('Error in POST / PUT', err);
        res.status(500).json({ status: "failure", message: err });
      }
})

module.exports = router;
// BEGIN TRANSACTION;

// INSERT INTO "location" ("galleryName", "galleryAddress", "galleryCut")
// VALUES ('The California Building', '3117 45th Ave S, Minneapolis, MN, 55046', 15);

// UPDATE "artPieces"
//     SET "galleryLocation" = LAST_INSERT_ID();
//         WHERE "artPieces"."id" = 1

// COMMIT;