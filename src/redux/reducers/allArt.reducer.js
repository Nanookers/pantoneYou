
const allArtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ART_REDUCER':
            return [...state, action.payload];
        default: 
            return state;
    }
};

export default allArtReducer;