import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import fetchArtSaga from './getAllArt.saga';
import uploadArtSaga from './addArtSaga.saga';
import addGalleryLocation from './addPostGallery.saga';
import updateSoldStatus from './updateSold.saga';
import singleFetchArt from './singleArtFetch.saga';
import singleEditArtSaga from './singleUpdateArt.saga';
import singleItemDelete from './SingleDelete.saga';
import tableDataFetch from './filterDate.saga';
import locationFetchSaga from './locationFetch.saga';
import locationUpdate from './locationUpdatePUT.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    fetchArtSaga(),
    uploadArtSaga(),
    addGalleryLocation(),
    updateSoldStatus(),
    singleFetchArt(),
    singleEditArtSaga(),
    singleItemDelete(),
    tableDataFetch(),
    locationFetchSaga(),
    locationUpdate()
  ]);
}
