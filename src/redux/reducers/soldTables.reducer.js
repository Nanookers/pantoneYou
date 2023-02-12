
const soldTables = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_FILTER_REDUCER':
            return  action.payload;
        default: 
            return state;
    }
};

export default soldTables;