
const allArtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ART_REDUCER':
            // ...action.payload pushes new create to the end of the state array. 
            return [...state, ...action.payload];
        default: 
            return state;
    }
};


export default allArtReducer;