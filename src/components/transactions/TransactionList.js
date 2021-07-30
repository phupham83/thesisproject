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
                            <li className="p-4 hover:bg-gray-50 cursor-pointer ">
                                <span className ="float-left">
                                    <span className ="bg-blue-100 p-2 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block   text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </span>
                                    <span className="ml-2">
                                        <b>{transaction.other_account.holder.name !== "" ? transaction.other_account.holder.name: "Account Holder" }</b>
                                    </span>
                                </span>
                                <span className ="ml-8">| {transaction.details.description} | </span>
                                <span className ={transaction.details.value.amount < 0 ? "float-right" : "float-right bg-green-100 text-green-600 rounded p-1"}><b>{transaction.details.value.amount > 0 ? "+" : "-"}€{transaction.details.value.amount > 0 ? transaction.details.value.amount : -transaction.details.value.amount }</b> </span>
                            </li>
                        </div>
                    )})}
            </ul>
        </div>
    )
}

export default TransactionList