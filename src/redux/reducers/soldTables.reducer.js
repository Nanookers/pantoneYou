
// DO I NEED THIS REDUCER? CHECK LATER! //
const soldTables = (state = [], action) => {
    switch (action.type) {
        case 'SET_TABLES_REDUCER':
            return action.payload;
        default: 
            return state;
    }
};

export default soldTables;