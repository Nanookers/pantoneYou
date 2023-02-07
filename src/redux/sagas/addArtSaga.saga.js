import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchArtSaga() {
    yield takeLatest('SAGA_ADD_NEW_ART', addArtSaga);
}

function* addArtSaga(action){
    try {
        const image = new FormData();
        // adding the url location of the data with image
        image.append('file', action.payload.fileInput.selectedFile);
        image.append('title', action.payload.title);
        image.append('price', action.payload.price);
        image.append('description', action.payload.description);
        
        console.log(image);

        const response = yield axios.post('/artPieces', image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        yield put({
            type: 'SET_ART_REDUCER',
            payload: response.data
        });
        
    } catch (error) {
        console.log('could not find', error);
    }
}


export default fetchArtSaga;