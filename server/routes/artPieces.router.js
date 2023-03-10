const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
/** ---------- GET ALL ART  ROUTE ---------- **/
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  
  // COALESCE RETURNS EMPTY STRINGS IN PLACE OF NULL VALUES. THIS ALLOWS YOU TO RETURN THE LOCATION EVEN IF THEY ARE NULL IN THE LOCATION TABLE
  const sqlQuery = `
  SELECT "artPieces"."id", "title", "price", "description", "userId", "image", 
    "galleryLocation", "galleryStatus", "soldStatus", "soldDate", 
      COALESCE("location"."galleryName", '') AS "galleryName", 
      COALESCE("location"."galleryAddress", '') AS "galleryAddress"
        FROM "artPieces"
          LEFT JOIN "location" ON "artPieces"."galleryLocation" = "location"."id"
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

router.post('/', upload.single("file"), async (req, res) => {
  try {
    // Initiates the upload of the photo
    const result = await s3Uploadv2(req.file);

    // imageAddress gets the link that the photo is stored at
    const imageAddress = result.Location;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const user = req.user.id;

    const sqlText = `
      INSERT INTO "artPieces"
        ("title", "image", "price", "description", "userId")
          VALUES
            ($1, $2, $3, $4, $5)
          RETURNING "id", "title", "price", "description", "userId", "image";
    `;

    const sqlValues = [title, imageAddress, price, description, user];
    console.log(sqlText, sqlValues);

    //This Variable works double time, posting to the Parent DB, and allows me
    // To call it below to post in the sold DB
    const dbRes = await pool.query(sqlText, sqlValues);

    // Get the id of the newly inserted art piece
    const artId = dbRes.rows[0].id;

    // Insert the artId into the child table
    // All art that is inserted into the soldPieces DB immediately, 
    // Until Location sold is given an indicator, it will be useless. 
    const childSqlText = `
      INSERT INTO "soldPieces" ("artId")
        VALUES ($1);
    `;
    
    const childSqlValues = [artId];
    await pool.query(childSqlText, childSqlValues);

    res.send(dbRes.rows);
  } catch (err) {
    console.error('Error in POST /api/images', err);
    res.status(500).json({ status: "failure", message: err });
  }
});

/** ---------- GET INDIVIDUAL ART ROUTE ---------- **/
router.get('/:id', rejectUnauthenticated,  (req, res) => {
  const userId = req.user.id;
  const artId = req.params.id;
 
  const sqlQuery = `
  SELECT "artPieces"."id", "title", "price", "description", "userId", "image", 
    "galleryLocation", "galleryStatus", "soldStatus", "soldDate", 
      COALESCE("location"."galleryName", '') AS "galleryName", 
      COALESCE("location"."galleryAddress", '') AS "galleryAddress"
        FROM "artPieces"
          LEFT JOIN "location" ON "artPieces"."galleryLocation" = "location"."id"
          WHERE "artPieces"."id"=$1 AND "artPieces"."userId" =$2;
    `
  const sqlValues = [ artId, userId ];
  console.log(sqlQuery, sqlValues);

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
