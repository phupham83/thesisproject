import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../reducers/loginReducer"

const Transaction = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transactions)
    const username = useSelector(state => state.user.username)
    return(
        <div>
            <p>{username} logged in <button onClick ={() => dispatch(logout())}>Log out</button></p>
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