import React from "react"

const TransactionList = ({ transactions }) => {
    let startingDate = null
    return(
        <div className = "bg-white shadow-xl rounded-lg ">
            <ul className="divide-y divide-gray-300">
                {transactions.map((transaction) => {
                    if(transaction.details.completed !== startingDate){
                        startingDate = transaction.details.completed
                    }else{
                        transaction.details.completed = null
                    }
                    return(
                        <div key = {transaction.id}>
                            {transaction.details.completed ? <h2 className="bg-gray-100 p-2 ">{transaction.details.completed}</h2> : true}
                            <li className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between">
                                {transaction.details.description === "Groceries" ?
                                    <span className ="flex-1" >
                                        <span>
                                            <img className="h-9 w-9 rounded-md overflow-hidden inline-block object-fill" src="https://static.wixstatic.com/media/e6c22f_099d12f4992f4e8a918666753eb4cc2b~mv2.png/v1/fill/w_280,h_280,al_c,q_90/file.jpg" />
                                        </span>
                                        <span className="ml-2">
                                            <b>{"TESCO STORES"}</b>
                                        </span>
                                    </span>
                                    :
                                    transaction.details.description === "Transport" ?
                                        <span className ="flex-1" >
                                            <span>
                                                <img className="h-9 w-9 rounded-md overflow-hidden inline-block object-fill" src="https://bookazi.com/wp-content/uploads/2020/07/pco-license.png" />
                                            </span>
                                            <span className="ml-2">
                                                <b>{"TFL TRAVEL"}</b>
                                            </span>
                                        </span>
                                        :
                                        transaction.details.description === "Food & Drink" ?
                                            <span className ="flex-1" >
                                                <span>
                                                    <img className="h-9 w-9 rounded-md overflow-hidden inline-block object-fill" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Just_eat_%28allo_resto%29_logo.png" />
                                                </span>
                                                <span className="ml-2">
                                                    <b>{"Just Eat"}</b>
                                                </span>
                                            </span>
                                            :
                                            transaction.details.description === "Bills" ?
                                                <span className ="flex-1" >
                                                    <span>
                                                        <img className="h-9 w-9 rounded-md overflow-hidden inline-block object-fill" src="https://resource.esriuk.com/wp-content/uploads/2019/02/severn_trent_water_logo.png" />
                                                    </span>
                                                    <span className="ml-2">
                                                        <b>{"Seven Trent Water"}</b>
                                                    </span>
                                                </span>
                                                :
                                                transaction.details.description === "Income" ?
                                                    <span className ="flex-1" >
                                                        <span>
                                                            <img className="h-9 w-9 rounded-md overflow-hidden inline-block object-fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/768px-EY_logo_2019.svg.png" />
                                                        </span>
                                                        <span className="ml-2">
                                                            <b>{"EY"}</b>
                                                        </span>
                                                    </span>
                                                    :
                                                    <span className ="flex-1" >
                                                        <span className ="bg-blue-100 p-1.5 rounded">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                            </svg>
                                                        </span>
                                                        <span className="ml-2">
                                                            <b>{transaction.other_account.holder.name !== "" ? transaction.other_account.holder.name: "Account Holder" }</b>
                                                        </span>
                                                    </span>
                                }
                                <span className ="flex-1"  >{transaction.details.description}</span>
                                <span className="flex-1"><span className ={transaction.details.value.amount < 0 ? "float-right" : " float-right bg-green-100 text-green-600 rounded p-1"}><b>{transaction.details.value.amount > 0 ? "+" : "-"}€{transaction.details.value.amount > 0 ? transaction.details.value.amount : -transaction.details.value.amount }</b> </span></span>
                            </li>
                        </div>
                    )})}
            </ul>
        </div>
    )
}

export default TransactionList
