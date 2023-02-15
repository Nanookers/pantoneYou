import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* locationFetchSaga() {
    yield takeLatest('SAGA_GET_LOCATION', getLocation);
}

function* getLocation(){
    try {
        const response = yield axios.get('/getLocations');
        yield put({ type: 'SET_LOCATION_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}


export default locationFetchSaga;