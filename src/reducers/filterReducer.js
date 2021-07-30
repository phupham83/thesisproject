const filterReducer = (state = "All", action) => {
    switch(action.type){
    case "SET_FILTER":
        return action.data
    default:
        return state
    }
}

export const setFilter = (timeFilter) => {
    return dispatch => {
        dispatch({
            type: "SET_FILTER",
            data: timeFilter
        })
    }
}

export default filterReducer