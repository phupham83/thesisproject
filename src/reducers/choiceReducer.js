
const choiceReducer = (state = { banks:[] , accounts :[] }, action) => {
    let newState = {}
    switch (action.type){
    case "SET_BANK":
        newState = { banks: [...state.banks, action.data], accounts: [...state.accounts] }
        return newState
    case "SET_ACCOUNT":
        newState = { banks:[...state.banks], accounts: [...state.accounts, action.data] }
        return newState
    case "REMOVE_BANK":
        newState ={ banks: state.banks.filter(bank => bank !== action.data), accounts: state.accounts.filter(account => account.bank !== action.data) }
        return newState
    case "REMOVE_ACCOUNT":
        newState ={ banks: [...state.banks], accounts: state.accounts.filter(
            account => {
                return (account.account !== action.data )
            })
        }
        return newState
    case "RESET":
        return { banks:[] , accounts :[] }
    default:
        return state
    }
}

export const setBank = (bank) => {
    return dispatch => {
        dispatch({
            type: "SET_BANK",
            data: bank
        })
    }
}

export const removeBank = (bank) => {
    return dispatch => {
        dispatch ({
            type: "REMOVE_BANK",
            data: bank
        })
    }
}
export const setAccount = (account, bank) => {
    return dispatch => {
        dispatch({
            type: "SET_ACCOUNT",
            data: { account: account, bank:bank }
        })
    }
}

export const removeAccount = (account) => {
    return dispatch => {
        dispatch ({
            type: "REMOVE_ACCOUNT",
            data: account
        })
    }
}

export const reset = () => {
    return dispatch => {
        dispatch ({
            type: "RESET"
        })
    }
}



export default choiceReducer