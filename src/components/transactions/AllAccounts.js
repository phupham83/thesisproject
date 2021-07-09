import React from "react"
import { Line } from "react-chartjs-2"

const AllAccounts = ({ transactions , totalBalance }) => {
    if(transactions[0]){
        transactions.sort((a,b) => {
            return new Date(b.details.completed) - new Date(a.details.completed)
        })
        let balance = totalBalance
        transactions = transactions.map(transaction => {
            const newBalance = balance
            balance -= Number(transaction.details.value.amount)
            const date = new Date(transaction.details.completed)
            const newDate =  date.getFullYear()+"-" + (date.getMonth()+1) + "-"+date.getDate()
            return { ...transaction, details: { ...transaction.details, completed: newDate , new_balance: { ...transaction.details.new_balance, amount: newBalance } } }
        })
        const dates = transactions.map(transaction => transaction.details.completed)
        let startingDate = null
        const balanceList = transactions.map(transaction => transaction.details.new_balance.amount)
        const data ={
            labels : dates,
            datasets: [{
                label: "Balance (EUR)",
                data: balanceList,
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            }]
        }
        const options = {
            scales: {
                yAxes: {
                    grid: { display: true, },
                    ticks: { beginAtZero: true } },
                xAxes: {
                    grid: { display: false, },
                    ticks: {
                        display: true,
                        autoSkip: true,
                        autoSkipPadding: 50,
                    }
                } },
        }
        return(
            <div >
                <div style ={{ height: "500px", width: "1000px" }} >
                    <Line data={data} options={options} />
                </div>
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
                                    {transaction.details.completed ? <h2 className="text-3xl font-semibold text-gray-800 md:text-2xl">{transaction.details.completed}</h2> : console.log()}
                                    <li className="p-4 hover:bg-gray-50 cursor-pointer">
                            Balance: {transaction.details.new_balance.amount.toFixed(2)} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                                    </li>
                                </div>
                            )})}
                    </ul>
                </div>
            </div>

        )
    }
    return(
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex justify-center items-center space-x-1 text-sm text-gray-700 ">

                <svg fill='none' className="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clipRule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor' fillRule='evenodd' />
                </svg>


                <div className ="text-3xl">Loading ...</div>
            </div>
        </div>
    )
}

export default AllAccounts