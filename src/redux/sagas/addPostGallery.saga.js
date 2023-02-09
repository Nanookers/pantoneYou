import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addGalleryLocation() {
    yield takeLatest('SAGA_POST_GALLERY', addGallery);
}

function* addGallery(action){
    try{
        console.log('Gallery Details:', action.payload);
        const response = yield axios({
            method: 'POST',
            url: `/updateListing`,
            data: {
                galleryName: action.payload.galleryName,
                galleryAddress: action.payload.galleryAddress,
                galleryCut: action.payload.galleryCut,
                artId: action.payload.artId
            }
        })
    }catch (error) {
        console.log('could not find', error);
    }
}

export default addGalleryLocation;