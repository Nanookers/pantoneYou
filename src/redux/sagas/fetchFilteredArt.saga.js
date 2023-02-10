import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFilteredArtUnlisted() {
    yield takeLatest('SAGA_GET_ART_UNLISTED', fetchFilteredArt);
}
function* fetchFilteredArt(){
    try {
        
        const response = yield axios.get('/artPieces');
        console.log(response.data)
        yield put({ type: 'SET_UNLISTED_FILTER_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default fetchFilteredArtUnlisted