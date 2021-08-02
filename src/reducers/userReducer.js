import userService from "../services/users"
import obpService from "../services/obp"
import bankService from "../services/banks"

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
    case "GET_CONSENT":
        return state
    case "GRANT_VIEW":
        return { ...state, accountIds: action.data[0], consent: action.data[1] }
    case "REVOKE_CONSENT_SINGLE":
        return action.data
    case "SET_BUDGET":
        return { ...state, budget: action.data }
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
            }else if(exception.response.data.error === "User has not verified their phone"){
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
                    const accountPromises = response.accounts.map(async account => {
                        let bank
                        const bankDB = await bankService.getBank(account.bank_id)
                        if(bankDB){
                            bank = bankDB
                        }else{
                            const bankOBP = await obpService.getBank(account.bank_id)
                            const bankResponse = await bankService.createBank({ bank_id: bankOBP.id, full_name: bankOBP.full_name, logo: bankOBP.logo })
                            bank = bankResponse
                        }
                        return(
                            { ...account, bank:bank }
                        )
                    })
                    const accounts = await Promise.all(accountPromises)
                    dispatch({
                        type: "GET_ACCOUNTS",
                        data: { ...user, accounts: accounts }
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
                    const transactionsPromises = user.accountIds.map(async (account) => {
                        const singleAccount = await obpService.getSingleAccount(account.bank, account.account)
                        const transactions = await obpService.getTransactions(account.bank, account.account)
                        let bank
                        const bankDB = await bankService.getBank(account.bank)
                        if(bankDB){
                            bank = bankDB
                        }else{
                            const bankOBP = await obpService.getBank(account.bank)
                            const bankResponse = await bankService.createBank({ bank_id: bankOBP.id, full_name: bankOBP.full_name, logo: bankOBP.logo })
                            bank = bankResponse
                        }

                        return(
                            { ...singleAccount, transactions: transactions.transactions, bank:bank }
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

export const grantView = (idState, accountIds, cb) => {
    return async dispatch => {
        try {
            const response = await userService.addAccounts([...accountIds, ...idState])
            const viewPromises = idState.map(async id => await obpService.grantView(id))
            await Promise.all(viewPromises)
            dispatch({
                type: "GRANT_VIEW",
                data: [[...accountIds, ...idState], response.consent]
            })
            cb()
        } catch (e) {
            console.log(e)
        }
    }
}

export const revokeConsentSingle = (user, account, bank) => {
    return async dispatch => {
        try {
            await obpService.revokeView({ account:account, bank:bank })
            const response = await userService.revokeSingle({ account: account })
            dispatch({
                type: "REVOKE_CONSENT_SINGLE",
                data: { ...user, accountIds: response.accountIds, consent: response.consent }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const setBudget = (budget, cb) => {
    return async dispatch => {
        try {
            const response = await userService.setBudget(budget)
            dispatch({
                type: "SET_BUDGET",
                data: response.budget
            })
            cb()
        } catch (e){
            console.log(e)
        }
    }
}

export default userReducer