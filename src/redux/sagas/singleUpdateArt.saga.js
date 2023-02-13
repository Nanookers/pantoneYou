import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* singleEditArtSaga() {
    yield takeLatest('SAGA_UPDATE_ART_INFO', editSingleArt);
}

function* editSingleArt(action){
    try {
        console.log(action.payload);
        const response = yield axios.put(`/updateIndividual/${action.payload.artId}`,{
            artId: action.payload.artId,
            title: action.payload.title,
            description: action.payload.description,
            price: action.payload.price
        });
        // console.log(response.data)
        // yield put({ type: 'SET_SINGLE_ART_REDUCER', payload: response.data });

    }catch (error) {
        console.error('Error fetching art pieces:', error);
    }
}

export default singleEditArtSaga