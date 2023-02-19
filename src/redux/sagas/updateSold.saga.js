import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';


function* updateSoldStatus() {
    yield takeLatest('SAGA_PUT_SOLD_STATUS', sendUpdateSold)
}

function* sendUpdateSold(action){
    try{
        console.log(action.payload.locationSold);
        const response = yield call (axios.put, '/updateSoldStatus', {
        artId: action.payload.artId,
        locationSold: action.payload.locationSold
      })
      const getResponse = yield axios.get('/artPieces');
      yield put({ type: 'SET_ART_REDUCER', payload: getResponse.data });
    }catch (error) {
      console.log('could not find', error);
    }
}

export default updateSoldStatus;