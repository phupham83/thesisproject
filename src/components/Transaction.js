import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { initializeTransactions } from "../reducers/transactionReducer"
const Transaction = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeTransactions())
    }, [dispatch])
    const transactions = useSelector(state => state.transactions)

    return(
        <div>

            <h1>Transactions</h1>
            <ul>
                {transactions.map(transaction =>
                    <li key = {transaction.id}>
                        {transaction.counterparty}
                        {transaction.amount}
                    </li>)}
            </ul>
        </div>

    )
}

export default Transaction