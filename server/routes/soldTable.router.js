const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    
    const sqlQuery = `
        SELECT "soldDate", "price", "title", "description", "location"."galleryName"
            FROM "artPieces"
            JOIN "location" on "location"."id" = "artPieces"."galleryLocation"
                WHERE
                    "soldDate" >= '2023-02-01'
                AND "soldDate" <  '2023-02-28'
                AND "userId" = $1;
    `
    const sqlValues = [userId];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('GET things failed in * from artPieces:', dbErr);
        res.sendStatus(500);
    })
  });

  module.exports = router;