import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchArtSaga() {
    yield takeLatest('SAGA_GET_ART', fetchArt);
}

function* fetchArt(){
    try {
        const response = yield axios.get('/artPieces');
        
        yield put({ type: 'SET_ART_REDUCER', payload: response.data });
        
    } catch (error) {
        console.log('could not find', error);
    }
}


export default fetchArtSaga;