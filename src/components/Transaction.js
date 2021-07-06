import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getTransactions } from "../reducers/userReducer"
const Transaction = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [dispatch])

    return(
        <div>
            <h1>Transactions</h1>
            <ul>
                {user.transactions.map(transaction =>
                    <li key = {transaction.id}>
                        Balance: {transaction.details.new_balance.amount} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                    </li>)}
            </ul>
        </div>

    )
}

export default Transaction