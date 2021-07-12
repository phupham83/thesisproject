import React from "react"
import Loading from "../Loading"
import TransactionList from "./TransactionList"
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
            return { ...transaction, details: { ...transaction.details, completed: newDate , new_balance: { ...transaction.details.new_balance, amount: newBalance.toFixed(2) } } }
        })
        const dates = transactions.map(transaction => transaction.details.completed)
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
                <TransactionList transactions = {transactions}/>
            </div>

        )
    }else if(totalBalance){
        return (
            <div>
                <h3>Balance: {totalBalance}</h3>
                No recent transactions
            </div>
        )
    }
    return(
        <Loading />
    )
}

export default AllAccounts