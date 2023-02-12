import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTableDates() {
    yield takeLatest('SAGA_GET_ART_ACTIVE', fetchSoldDates);
}
function* fetchSoldDates(){
    try {
        
        const response = yield axios.get('/getSoldTables');
        console.log(response.data)
        yield put({ type: 'SET_ACTIVE_FILTER_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default fetchTableDates