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
  // imageAddress gets the link that the photo is stored at
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const user = req.user.id;

  try {
    await pool.query('BEGIN');
    // Initiates the upload of the photo
    const result = await s3Uploadv2(req.file);
    // Returns the image location in the s3 photobucket
    const imageAddress = result.Location;
    // Posts the image w/ photobucket location in the artPieces table
    const sqlText = `
      INSERT INTO "artPieces"
        ("title", "image", "price", "description", "userId")
          VALUES
            ($1, $2, $3, $4, $5)
          RETURNING "id", "title", "price", "description", "userId", "image";
    `;

    const sqlValues = [title, imageAddress, price, description, user];
    console.log(sqlText, sqlValues);

    // This is the db response that returns the information that I just create, allowing me to grab the id.
    const dbRes = await pool.query(sqlText, sqlValues);
    const artId = dbRes.rows[0].id;

    // soldPieces needs this id to allow for it to be sold at future times. 
    const childSqlText = `
      INSERT INTO "soldPieces" ("artId")
        VALUES ($1);
    `;
    const childSqlValues = [artId];
    await pool.query(childSqlText, childSqlValues);
    await pool.query('COMMIT');
    // Sending response to SAGA for immediate rendering on the DOM.
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
