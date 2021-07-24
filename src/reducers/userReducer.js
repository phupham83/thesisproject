import userService from "../services/users"
import obpService from "../services/obp"

const userReducer = (state = null, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.data
    case "LOCAL_LOGIN":
        if(action.data) {
            return action.data
        }else {
            return action.data
        }
    case "LOGOUT":
        return null
    case "SIGN_UP":
        return state
    case "GET_CONSENT":
        return state
    case "GRANT_VIEW":
        return { ...state, accountIds: action.data }
    case "REVOKE_CONSENT_SINGLE":
        return action.data
    case "GET_ACCOUNTS":
        return action.data
    case "NO_ACCOUNTS":
        return state
    case "GET_TRANSACTIONS":
        return action.data
    case "GET_BALANCE":
        return action.data
    default:
        return state
    }
}

export const login = (email, password, cb, messageCb) => {
    return async dispatch => {
        try {
            const user = await userService.login({
                email, password,
            })
            dispatch ({
                type: "LOGIN",
                data: user,
            })
            cb()
        } catch (exception) {
            if(exception.response.data.error === "User has not verified their email"){
                messageCb(exception.response.data.error)
            }else if(exception.response.data.error === "Wrong password"){
                messageCb(exception.response.data.error)
            }else{
                console.log(exception)
                messageCb("Wrong user")
            }
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

export const signup = (email, name, number, password,cb, messageCb) => {
    return async dispatch => {
        try {
            await userService.signup({
                email, name, number, password,
            })
            dispatch({
                type: "SIGN_UP"
            })
            messageCb("Sign up successful, please verifiy your email to continue")
            cb()
        } catch (e) {
            console.log(e.response.data.error)
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
            if(user.accounts){
                try {
                    dispatch({
                        type: "GET_ACCOUNTS",
                        data: { ...user }
                    })
                } catch (e) {
                    console.log(e)
                }
            }else{
                try {
                    const response = await obpService.getAccounts()
                    dispatch({
                        type: "GET_ACCOUNTS",
                        data: { ...user, accounts: response.accounts }
                    })
                } catch (e) {
                    console.log(e)
                }
            }}else {
            dispatch({
                type: "NO_ACCOUNTS"
            })
        }
    }
}

export const getTransactions = (user) => {
    return async dispatch => {
        if(user){
            if(user.consent){
                try {
                    const reducer = (a,b) => {
                        if(a && b){
                            return [...b, ...a]
                        }
                        return b
                    }
                    const transactionsPromises = user.accountIds.map(async (account) => {
                        const singleAccount = await obpService.getSingleAccount(account.bank, account.account)
                        const response = await obpService.getBalance(account.bank)
                        const transactions = await obpService.getTransactions(account.bank, account.account)
                        const balances = response.accounts.reduce((initial, item) => {
                            if(item.account_id === account.account){
                                initial.push(item.balances.reduce(reducer))
                                return initial
                            }else{
                                return initial
                            }
                        },[])
                        return(
                            { ...singleAccount, transactions: transactions.transactions, balances: balances }
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
        }else {
            dispatch({
                type: "NO_ACCOUNTS"
            })
        }
    }
}

export const grantView = (idState, accountIds) => {
    return async dispatch => {
        try {
            await userService.addAccounts([...accountIds, ...idState])
            const viewPromises = idState.map(async id => await obpService.grantView(id))
            await Promise.all(viewPromises)
            await
            dispatch({
                type: "GRANT_VIEW",
                data: [...accountIds, ...idState]
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const revokeConsentSingle = (account, bank) => {
    return async dispatch => {
        try {
            await obpService.revokeView({ account:account, bank:bank })
            const response = await userService.revokeSingle({ account: account })
            dispatch({
                type: "REVOKE_CONSENT_SINGLE",
                data: response
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default userReducer