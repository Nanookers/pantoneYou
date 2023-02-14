
const allArtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ART_REDUCER':
            // ...state breaks it
            return action.payload;
        default: 
            return state;
    }
};


export default allArtReducer;