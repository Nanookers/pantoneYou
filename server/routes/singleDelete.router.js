const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- Update Gallery ---------- **/
router.delete('/:id', async (req, res) => {
    try{
      const artId = req.params.id
      console.log(artId);

        const sqlQuery =`
            DELETE FROM "artPieces"
                WHERE "id" = $1;
        `
        const sqlValues = [ artId ]
        const dbRes = await pool.query(sqlQuery, sqlValues);
    }catch (err) {
        console.error('Error in DELETE', err);
        res.status(500).json({ status: "failure", message: err });
    }
})

module.exports = router;