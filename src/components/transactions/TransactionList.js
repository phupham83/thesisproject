import React from "react"

const TransactionList = ({ transactions }) => {
    let startingDate = null
    return(
        <div className = "bg-white shadow-xl rounded-lg w-1/2">
            <ul className="divide-y divide-gray-300">
                {transactions.map((transaction) => {
                    if(transaction.details.completed !== startingDate){
                        startingDate = transaction.details.completed
                    }else{
                        transaction.details.completed = null
                    }
                    return(
                        <div key = {transaction.id}>
                            {transaction.details.completed ? <h2>{transaction.details.completed}</h2> : console.log()}
                            <li className="p-4 hover:bg-gray-50 cursor-pointer">
                            Balance: {transaction.details.new_balance.amount} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                            </li>
                        </div>
                    )})}
            </ul>
        </div>
    )
}

export default TransactionList