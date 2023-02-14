
const soldTables = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_FILTER_REDUCER':
            const newPayload = action.payload.filter(art => art.soldStatus === true);
            return  action.payload;
        default: 
            return state;
    }
};

export default soldTables;