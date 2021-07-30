import React from "react"
import Loading from "../utils/Loading"
import TransactionList from "./TransactionList"
import { Line } from "react-chartjs-2"

const AllAccounts = ({ transactions , totalBalance, timeFilter }) => {
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
        const filterTransactions = (transactions, time) => {
            const dateNow = new Date()
            if(time === "Today"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth() && date.getDate() === dateNow.getDate()
                    )
                }))
            }else if(time === "This month"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()
                    )
                }))
            }else if(time === "This year"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear()
                    )
                }))
            }else if(time === "All"){
                return transactions
            }
        }
        const filteredTransactions = filterTransactions(transactions, timeFilter)
        const dates = filteredTransactions.map(transaction => transaction.details.completed)
        const balanceList = filteredTransactions.map(transaction => transaction.details.new_balance.amount)
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
                }
            },
        }
        if(filteredTransactions.length !== 0){
            return(
                <div >
                    <h3>{`Balance: €${totalBalance}`}</h3>
                    <div style ={{ height: "500px", width: "1000px" }} >
                        <Line data={data} options={options} />
                    </div>
                    <TransactionList transactions = {filteredTransactions}/>
                </div>
            )
        }else {
            return (
                <div>
                    <h3>{`Balance: €${totalBalance}`}</h3>
                    {`No transactions ${timeFilter}`}
                </div>
            )
        }
    }else if(totalBalance){
        return (
            <div>
                <h3>{`Balance: €${totalBalance}`}</h3>
                No recent transactions
            </div>
        )
    }
    return(
        <Loading />
    )
}

export default AllAccounts