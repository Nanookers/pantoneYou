import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSoldCount() {
    yield takeLatest('SAGA_GET_SOLD_COUNT', fetchSoldCounter);
}

function* fetchSoldCounter(){
    try {
        const response = yield axios.get('/soldCounter');
        yield put({ type: 'SET_SOLD_COUNT_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default fetchSoldCount;