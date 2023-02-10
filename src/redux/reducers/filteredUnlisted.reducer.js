const filterUnlistedArt = (state = [], action) => {
    switch (action.type) {
        case 'SET_UNLISTED_FILTER_REDUCER':
            const newPayload = action.payload.filter(art => art.galleryStatus === false 
                && art.soldStatus === false);
            return newPayload
        default: 
            return state;
    }
};

export default filterUnlistedArt;