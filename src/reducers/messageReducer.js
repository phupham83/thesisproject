const messageReducer = (state = null, action) => {
    switch (action.type){
    case "SET_MESSAGE":
        return action.data
    default:
        return state
    }
}

export const setMessage = (message) => {
    return dispatch => {
        dispatch({
            type: "SET_MESSAGE",
            data: message
        })
        setTimeout(() => dispatch({ type: "SET_MESSAGE", data: null }), 3000)
    }
}

export const clearMessage = () => {
    return dispatch => {
        dispatch({
            type: "SET_MESSAGE",
            data: null
        })
    }
}

export default messageReducer