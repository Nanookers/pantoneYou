import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUnsoldList() {
    yield takeLatest('SAGA_GET_ART_UNSOLD', fetchUnsold);
}

function* fetchUnsold(){
    try {

        const response = yield axios.get('/artPieces');
        yield put({ type: 'SET_UNSOLD_FILTER_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default fetchUnsoldList
