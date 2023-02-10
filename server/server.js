const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const artPiecesRouter = require('./routes/artPieces.router');
const galleryLocationChange = require('./routes/updateListing.router')
const galleryLocationChangeDB = require('./routes/updateLocation.router')
const soldStatusUpdate = require('./routes/updateSoldStatus.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/artPieces', artPiecesRouter); //router that GETS and POSTs to the main database.
app.use('/updateListing', galleryLocationChange); //router that POSTs to the LOCATION databse, 
app.use('/updateListinginChildDB', galleryLocationChangeDB); // Updates the gallery location of artPieces based on the above post
app.use('/updateSoldStatus', soldStatusUpdate); // Updates the soldStatus of an ArtPieces and the gallery it was sold in


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
