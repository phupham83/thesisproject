import React from "react"
import TransactionList from "./TransactionList"
import { Line } from "react-chartjs-2"

const SingleAccounts = ({ transactions, balance }) => {
    if(transactions[0]){
        transactions = transactions.map(transaction => {
            const date = new Date(transaction.details.completed)
            const newDate =  date.getFullYear()+"-" + (date.getMonth()+1) + "-"+date.getDate()
            return { ...transaction, details: { ...transaction.details, completed: newDate } }
        })
        const dates = transactions.map(transaction => transaction.details.completed)
        const balanceList = transactions.map(transaction => transaction.details.new_balance.amount)
        const data ={
            labels : dates.reverse(),
            datasets: [{
                label: "Balance (EUR)",
                data: balanceList.reverse(),
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
                <TransactionList transactions = {transactions}/>
            </div>
        )
    }else if(balance){
        return (
            <div>
                <h3>{balance.amount}</h3>
                No recent transactions
            </div>
        )
    }
}

export default SingleAccounts