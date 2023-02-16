const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.post('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    console.log(req.body);
    const { dayBegin, monthBegin, yearBegin, dayEnd, monthEnd, yearEnd } = req.body;

    const newMonthBegin = monthBegin < 12 ? monthBegin + 1 : monthBegin
    const newMonthEnd = monthEnd < 12 ? monthEnd + 1 : monthEnd

    const sqlQuery = `
        SELECT "soldDate", "price", "title", "description", "location"."galleryName", "location"."id"
            FROM "artPieces"
            JOIN "location" on "location"."id" = "artPieces"."galleryLocation"
                WHERE
                    "soldDate" >= '${yearBegin}-${newMonthBegin}-${dayBegin}'
                AND "soldDate" <=   '${yearEnd}-${newMonthEnd}-${Number(dayEnd)+1}'
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