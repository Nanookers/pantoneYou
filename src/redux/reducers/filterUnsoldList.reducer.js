const filterUnsoldArt = (state = [], action) => {
    switch (action.type) {
        case 'SET_UNSOLD_FILTER_REDUCER':
            const newPayload = action.payload.filter(art => art.soldStatus === false);
            return newPayload
        default: 
            return state;
    }
};

export default filterUnsoldArt;