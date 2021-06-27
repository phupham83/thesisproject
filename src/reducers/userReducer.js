import userService from "../services/users"

const userReducer = (state = null, action) =>{
    switch(action.type){
        case "SIGN_UP":
            return action.data
        default:
            console.log("")
    }
    return state
}

export const signup = (username, name, password,cb) =>{
    return async dispatch =>{
        try {
            const response = await userService.signup({
                username, name, password,
            })
            dispatch({
                type: "SIGN_UP",
                data: response
            })
            cb()
        } catch (e) {
            console.log(e)
        }
    }
}

export default userReducer