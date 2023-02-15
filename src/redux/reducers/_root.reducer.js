import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allArtReducer from './allArt.reducer';
import filterUnlistedArt from './filteredUnlisted.reducer';
import filterUnsoldArt from './filterUnsoldList.reducer';
import filteredActiveStatus from './filterActiveArt.reducer';
import soldTables from './soldTables.reducer';
import singleArtPiece from './singleInfo.reducer';
import locationReducer from './setLocations.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allArtReducer, 
  filterUnlistedArt,
  filterUnsoldArt,
  filteredActiveStatus,
  soldTables,
  singleArtPiece,
  locationReducer
  
});

export default rootReducer;
