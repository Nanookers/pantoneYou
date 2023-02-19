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
        const getResponse = yield axios.get('/artPieces');
        yield put({ type: 'SET_ART_REDUCER', payload: getResponse.data });
        

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default singleItemDelete;