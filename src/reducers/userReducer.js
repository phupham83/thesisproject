import userService from "../services/users"
import obpService from "../services/obp"

const userReducer = (state = null, action) => {
    let newState
    switch (action.type) {
    case "LOGIN":
        return { ... action.data }
    case "LOCAL_LOGIN":
        if(action.data) {
            return { ... action.data }
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
        newState = { ...state, accounts: action.data }
        return newState
    case "NO_ACCOUNTS":
        return state
    case "GET_TRANSACTIONS":
        return action.data
    case "GET_BALANCE":
        return action.data
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
                    data: response.accounts
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

export const getTransactions = (user) => {
    return async dispatch => {
        if(user.consent){
            try {
                const data = await obpService.getAccounts()
                const reducer = (a,b) => {
                    if(a && b){
                        return [...b, ...a]
                    }
                    return b
                }
                const transactionsPromises = data.accounts.map(async (account) => {
                    const response = await obpService.getBalance(account.bank_id)
                    const transactions = await obpService.getTransactions(account.bank_id, account.id)
                    const balances = response.accounts.reduce((initial, item) => {
                        if(item.account_id === account.id){
                            initial.push(item.balances.reduce(reducer))
                            return initial
                        }else{
                            return initial
                        }
                    },[])
                    return(
                        { ...account, transactions: transactions.transactions, balances: balances }
                    )
                })
                const results = await Promise.all(transactionsPromises)
                const newUser = { ...user, accounts: results }
                dispatch({
                    type:"GET_TRANSACTIONS",
                    data: newUser
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

// export const getBalance = (user) => {
//     return async dispatch => {
//         if(user.consent){
//             try {
//                 const data = await obpService.getAccounts()
//                 const balancePromises = data.accounts.map(async (account) => {
//                     const response = await obpService.getBalance(account.bank_id)
//                     const balances = response.accounts.map(account => account.balances)
//                     return(
//                         { ...account, balance: balances }
//                     )
//                 })
//                 const results = await Promise.all(balancePromises)
//                 const newUser = { ...user, accounts: results }
//                 dispatch({
//                     type:"GET_BALANCE",
//                     data: newUser
//                 })
//             } catch (e) {
//                 console.log(e)
//             }
//         }else{
//             dispatch({
//                 type:"NO_ACCOUNTS"
//             })
//         }
//     }
// }


export default userReducer