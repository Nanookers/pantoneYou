const soldCounterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SOLD_COUNT_REDUCER':
            console.log(action.payload);
            return action.payload;
        default: 
            return state;
    }
};

export default soldCounterReducer;