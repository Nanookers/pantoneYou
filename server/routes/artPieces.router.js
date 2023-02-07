const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  const sqlQuery = `
    SELECT * FROM "artPieces"
      WHERE "id"=$1
        ORDER BY "title";
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
