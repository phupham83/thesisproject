import React from "react"

const SingleAccounts = ({ transactions }) => {
    if(transactions[0]){
        return(
            <ul>
                {transactions.map(transaction =>
                    <li key = {transaction.id}>
                            Balance: {transaction.details.new_balance.amount} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                    </li>)}
            </ul>
        )
    }
    return(
        <h1>Loading ...</h1>
    )
}

export default SingleAccounts