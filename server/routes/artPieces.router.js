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
const { s3Uploadv2 } = require('../s3Service');


const fileFilter = (req, file, cb) =>{
    if(file.mimetype.split('/')[0] === 'image'){
      cb(null, true)
    } else{
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}


const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter })


router.post('/', upload.single("file"), async (req, res)=>{
  try {

      const result = await s3Uploadv2(req.file)
      
      const imageAddress = result.Location
      const title = req.body.title
      const price = req.body.price
      const description = req.body.description
      const user = req.user.id
      

      
      const sqlText = `
        INSERT INTO "artPieces"
          ("title", "image", "price", "description" "userId" )
            VALUES
              ($1, $2, $3, $4, $5);
      `;
      
      const sqlValues = [ title, imageAddress, price, description, user ];
      console.log(sqlText, sqlValues);
      await pool.query(sqlText, sqlValues)
      res.status(201).json({status: "success", result});
  } catch(err) {
      console.error('Error in POST /api/images', err)
      res.status(500).json({status: "failure", message: err});
  }
})






module.exports = router;
