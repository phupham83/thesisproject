import React from "react"

const AllAccounts = ({ transactions , totalBalance }) => {
    if(transactions[0]){
        transactions.sort((a,b) => {
            return new Date(b.details.completed) - new Date(a.details.completed)
        })
        let balance = totalBalance
        return(
            <ul>
                {transactions.map((transaction) =>
                {
                    const newBalance = balance
                    balance -= Number(transaction.details.value.amount)
                    return(
                        <li key = {transaction.id}>
                            Balance: {newBalance.toFixed(2)} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description} Completed: {transaction.details.completed}
                        </li>)})}
            </ul>
        )
    }
    return(
        <h1>Loading ...</h1>
    )
}

export default AllAccounts