import userService from "../services/users"
import obpService from "../services/obp"

const userReducer = (state = null, action) => {
    let newState
    switch (action.type) {
    case "LOGIN":
        return { ... action.data, accounts:[], transactions:[] }
    case "LOCAL_LOGIN":
        if(action.data) {
            return { ... action.data, accounts:[], transactions:[]  }
        }else {
            return action.data
        }
    case "LOGOUT":
        return null
    case "SIGN_UP":
        console.log(action.data)
        return state
    case "GET_CONSENT":
        console.log(action.data)
        return state
    case "GET_ACCOUNTS":
        newState = { ...state, accounts: action.data.accounts }
        return newState
    case "NO_ACCOUNTS":
        return state
    case "GET_TRANSACTIONS":
        newState = { ...state, transactions: action.data.transactions }
        return newState
    default:
        console.log("")
    }
    return state
}

export const login = (username, password, cb, messageCb) => {
    return async dispatch => {
        try {
            const user = await userService.login({
                username, password,
            })
            dispatch ({
                type: "LOGIN",
                data: user,
            })
            cb()
        } catch (exception) {
            console.log(exception)
            messageCb("Wrong username or password")
        }
    }
}

export const localLogin = () => {
    return ( async dispatch =>
    {
        const user = await userService.localLogin()
        dispatch ({
            type: "LOCAL_LOGIN",
            data: user
        })}
    )
}

export const logout = (cb) => {
    return ( async dispatch =>
    {
        await userService.logOut()
        dispatch ({
            type: "LOGOUT"
        })
        cb()
    }
    )
}

export const signup = (username, name, password,cb, messageCb) => {
    return async dispatch => {
        try {
            const response = await userService.signup({
                username, name, password,
            })
            dispatch({
                type: "SIGN_UP",
                data: response
            })
            messageCb("Sign up successful")
            cb()
        } catch (e) {
            console.log(e)
            messageCb(e.response.data.error)
        }
    }
}

export const getConsent = () => {
    return async dispatch => {
        try {
            const response = await obpService.getConsent()
            dispatch({
                type: "GET_CONSENT",
                data: response
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const getAccounts = (user) => {
    return async dispatch => {
        if (user.consent){
            try {
                const response = await obpService.getAccounts()
                dispatch({
                    type: "GET_ACCOUNTS",
                    data: response
                })
            } catch (e) {
                console.log(e)
            }
        }
        else {
            dispatch({
                type: "NO_ACCOUNTS"
            })
        }
    }
}

export const getTransactions = (user, bankid, id) => {
    return async dispatch => {
        if(user.consent){
            try {
                const response = await obpService.getTransactions(bankid, id)
                dispatch({
                    type:"GET_TRANSACTIONS",
                    data: response
                })
            } catch (e) {
                console.log(e)
            }
        }else {
            dispatch({
                type: "NO_ACCOUNTS"
            })
        }
    }
}


export default userReducer