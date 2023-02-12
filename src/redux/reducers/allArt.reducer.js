
const allArtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ART_REDUCER':
            return action.payload;
        default: 
            return state;
    }
};


export default allArtReducer;