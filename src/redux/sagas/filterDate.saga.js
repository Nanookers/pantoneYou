import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* tableDataFetch() {
    yield takeLatest('SAGA_GET_TABLE_DATA', getTableData);
}

function* getTableData(action){
    try {
        console.log(action.payload);
        // create single object to POST, Fetch neccessary data 
        // The Response is using a SELECT FROM, and is sent to 
        // The reducer that populates the fetched Data
        const newPayload = {
            dayBegin: action.payload.dateOne.firstDay,
            monthBegin: action.payload.dateOne.firstMonth,
            yearBegin: action.payload.dateOne.firstYear,
            dayEnd: action.payload.dateTwo.secondDay,
            monthEnd: action.payload.dateTwo.secondMonth,
            yearEnd: action.payload.dateTwo.secondYear
        }
        console.log(newPayload);
        const response = yield axios.post('/getSoldTables', newPayload );
        console.log(response.data)
        yield put({ type: 'SET_TABLES_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}
export default tableDataFetch;