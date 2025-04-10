const initialState = {
    candidates: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CANDIDATES":
        return { ...state, candidates: action.payload };
      case "UPDATE_STATUS":
        return {
          ...state,
          candidates: state.candidates.map((c) =>
            c._id === action.payload.id ? { ...c, status: action.payload.status } : c
          ),
        };
      default:
        return state;
    }
  };
  
  export default reducer;