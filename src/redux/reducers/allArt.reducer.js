
const allArtReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ART_REDUCER':
            // Store the new art objects in a variable.
            const newArt = action.payload;
            // Get the IDs of existing art objects in the state array.
            const existingArtIds = state.map(art => art.id);
            return [
                // Filter out objects in the state that share the id to prevent the duplicates that were occuring
              ...state.filter(art => !existingArtIds.includes(art.id)),
              ...newArt.map(art => {
                const existingArt = state.find(a => a.id === art.id);
                if (existingArt) {
                  return { ...existingArt, ...art };
                } else {
                  return art;
                }
              })
            ];
        default: 
            return state;
    }
};


export default allArtReducer;