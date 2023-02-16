import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* singleItemDelete() {
    yield takeLatest('DELETE_SINGLE', singleDelete);
}

function* singleDelete(action){
    try {
        console.log(action.payload);
        const response = yield axios.delete(`/deletePiece/${action.payload}`,{
        });
        yield put({ type: 'SET_ART_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default singleItemDelete;