const singleArtPiece = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_ART_REDUCER':
            const newPayload = (action.payload[0]);
            return newPayload;
        case 'SET_NEW_TITLE':
            const newTitle = action.payload
            return {...state, title: newTitle}
        case 'SET_NEW_DESCRIPTION':
            const newDescription = action.payload
            return {...state, description: newDescription}
        case 'SET_NEW_PRICE':
            const newPrice = action.payload
            return {...state, price: newPrice}
        default: 
            return state;
    }
};


export default singleArtPiece;