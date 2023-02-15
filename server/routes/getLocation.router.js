const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.user.id;
    
    const sqlQuery = `
      SELECT "id",
             "galleryName"
        FROM "location"   
    `
    
    pool.query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('GET things failed in * from artPieces:', dbErr);
        res.sendStatus(500);
    })
});

module.exports = router;