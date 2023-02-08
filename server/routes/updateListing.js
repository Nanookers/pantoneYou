const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- PUT ROUTE FOR SOLD ---------- **/

router.post( '/', async (req, res) => {
    try{
        const sqlQuery =`
        BEGIN TRANSACTION;

        INSERT INTO "location" ("galleryName", "galleryAddress", "galleryCut")
        VALUES ('The California Building', '3117 45th Ave S, Minneapolis, MN, 55046', 15);
        
        UPDATE "artPieces"
            SET "galleryLocation" = LAST_INSERT_ID();
                WHERE "artPieces"."id" = 1
        
        COMMIT;
        `
    }catch (err) {
        console.error('Error in POST / PUT', err);
        res.status(500).json({ status: "failure", message: err });
      }
})

module.exports = router;