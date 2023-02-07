const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  
  const sqlQuery = `
    SELECT * FROM "artPieces"
      WHERE "userId"=$1;
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

/** ---------- Multer | S3 ---------- **/
require('dotenv').config();
const multer = require('multer');
const { s3Uploadv2 } = require('./s3service');


const fileFilter = (req, file, cb) =>{
    if(file.mimetype.split('/')[0] === 'image'){
      cb(null, true)
    } else{
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}


const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter })


app.post('/', upload.single("file"), async (req, res)=>{
    
    const result = await s3Uploadv2(req.file)
    res.json({status: "success", result})
    const imageAddress = result.Location
    
    const sqlText = `
      INSERT INTO "artPieces"
        ("title", "image", "price", "description", "userId" )
        VALUES
        ($1, $2, $3, $4, $5);
    `;
  
    const sqlValues = [ imageAddress ];
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.error('db error in POST /api/images', dbErr)
        res.sendStatus(500);
      })
  })





module.exports = router;
