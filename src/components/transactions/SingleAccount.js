import React from "react"

const SingleAccounts = ({ transactions, balances }) => {
    if(transactions[0]){
        return(
            <ul>
                {transactions.map(transaction =>
                    <li key = {transaction.id}>
                            Balance: {transaction.details.new_balance.amount} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                    </li>)}
            </ul>
        )
    }else if(balances[0]){
        return (
            <ul>
                {balances.map(balance =>
                    <li key = {balance.amount}>
                            Balance: {balance.amount}
                    </li>)}
            </ul>
        )
    }
    return(
        <h1>Loading ...</h1>
    )
}

export default SingleAccounts