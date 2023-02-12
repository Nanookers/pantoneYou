const filteredActiveStatus = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_FILTER_REDUCER':
            const newPayload = action.payload.filter(art => art.galleryStatus === true);
            return newPayload
        default: 
            return state;
    }
};

export default filteredActiveStatus;