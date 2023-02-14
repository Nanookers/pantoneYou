import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import fetchArtSaga from './getAllArt.saga';
import uploadArtSaga from './addArtSaga.saga';
import addGalleryLocation from './addPostGallery.saga';
import updateSoldStatus from './updateSold.saga';
import fetchFilteredArtUnlisted from './fetchFilteredArt.saga';
import fetchUnsoldList from './fetchUnsoldList.saga';
import fetchFilteredArtActive from './fetchActiveArt.saga';
import fetchTableDates from './fetchTableDates.saga';
import singleFetchArt from './singleArtFetch.saga';
import singleEditArtSaga from './singleUpdateArt.saga';
import singleItemDelete from './SingleDelete.saga';
import tableDataFetch from './filterDate.saga';

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
    fetchFilteredArtUnlisted(),
    fetchUnsoldList(),
    fetchFilteredArtActive(),
    fetchTableDates(),
    singleFetchArt(),
    singleEditArtSaga(),
    singleItemDelete(),
    tableDataFetch()
  ]);
}
