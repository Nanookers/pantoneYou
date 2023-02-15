import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* locationUpdate() {
    yield takeLatest('SAGA_PUT_EXISTING_GALLERY', newLocation);
}

function* newLocation(action){
    try{
        console.log(action.payload.locationId[0]);
        const newPayload = {
            locationId: action.payload.locationId[0],
            artId: action.payload.id
        }
        console.log(newPayload);
        const response = yield axios.put('/updateExistingLocation', newPayload);
        yield put({ type: 'SET_ART_REDUCER', payload: response.data });
    }catch(error){
        console.error('error in location update EXISTING location:', error);
    }
}

export default locationUpdate;