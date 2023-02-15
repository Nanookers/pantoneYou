const locationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCATION_REDUCER':
            return action.payload;
        default: 
            return state;
    }
};

export default locationReducer;