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
            <div>
                <div style ={{ height: "500px", width: "1000px" }} >
                    <Line data={data} options={options} />
                </div>
                <ul>
                    {transactions.map((transaction) => {
                        if(transaction.details.completed !== startingDate){
                            startingDate = transaction.details.completed
                        }else{
                            transaction.details.completed = null
                        }
                        return(
                            <div key = {transaction.id}>
                                {transaction.details.completed ? <h2>{transaction.details.completed}</h2> : console.log()}
                                <li >
                            Balance: {transaction.details.new_balance.amount.toFixed(2)} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                                </li>
                            </div>
                        )})}
                </ul>
            </div>

        )
    }
    return(
        <h1>Loading ...</h1>
    )
}

export default AllAccounts