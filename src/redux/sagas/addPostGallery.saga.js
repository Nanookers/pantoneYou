import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* addGalleryLocation() {
    yield takeLatest('SAGA_POST_GALLERY', addGallery);
}

function* addGallery(action) {
    try {
      console.log('Gallery Details:', action.payload);
      const responseOne = yield call(axios.post, '/updateListing', {
        galleryName: action.payload.galleryName,
        galleryAddress: action.payload.galleryAddress,
        galleryCut: action.payload.galleryCut
      });
      
      console.log(responseOne);
      
        // Second Yield takes the response from the SQL return, and sends it to PUT
        // That Assigns the foreign key in the main table.
      yield call(axios.put, '/updateListinginChildDB', {
        locationId: responseOne.data[0].id, 
        artId: action.payload.artId,
      });
    } catch (error) {
      console.log('could not find', error);
    }
  }

export default addGalleryLocation;