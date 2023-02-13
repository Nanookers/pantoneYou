const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Update Gallery ---------- **/
router.put('/:id', async (req, res) => {
    try{

      const title = req.body.title
      const description = req.body.description
      const price = req.body.price
      const artId = req.params.id
      console.log(title, artId, description, price);

        const sqlText =`
            UPDATE "artPieces"
                SET "title" = $1,
                    "description" = $2,
                    "price" = $3
                WHERE "id" = $4;
        `
        const sqlValues = [ title, description, price, artId ]
        const dbRes = await pool.query(sqlText, sqlValues);
    }catch (err) {
        console.error('Error in PUT Gallery Location', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;