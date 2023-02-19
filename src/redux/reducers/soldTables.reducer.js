const soldTables = (state = [], action) => {
    switch (action.type) {
        case 'SET_TABLES_REDUCER':
            console.log(action.payload);
            return action.payload;
        default: 
            return state;
    }
};

export default soldTables;