import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* singleFetchArt() {
    yield takeLatest('FETCH_SINGLE_PIECE_DETAILS', singleArt);
}
function* singleArt(action){
    try {
        const artId = action.payload
        console.log(artId);
        const response = yield axios.get(`/artPieces/${artId}`);
        console.log(response.data)
        yield put({ type: 'SET_SINGLE_ART_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default singleFetchArt