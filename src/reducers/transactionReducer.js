import transactionsService from "../services/transactions"

const transactionReducer = (state = [], action) => {
    switch (action.type) {
    case "INIT_TRANSACTION":
        return action.data
    default:
        console.log("")
    }
    return state
}

export const initializeTransactions = () => {
    return async dispatch => {
        const transactions = await transactionsService.getAll()
        dispatch ({
            type: "INIT_TRANSACTION",
            data: transactions,
        })
    }
}

export default transactionReducer