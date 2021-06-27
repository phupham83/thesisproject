import React from "react"
import { useSelector } from 'react-redux'

const Transaction = () => {
    
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