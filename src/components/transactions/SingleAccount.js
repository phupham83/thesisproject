import React from "react"
import TransactionList from "./TransactionList"
import { Line } from "react-chartjs-2"

const SingleAccounts = ({ transactions, balance, timeFilter }) => {
    if(transactions[0]){
        const filterTransactions = (transactions, time) => {
            const dateNow = new Date()
            const oneJan = new Date(dateNow.getFullYear(),0,1)
            const numberOfDays = Math.floor((dateNow - oneJan) / (24 * 60 * 60 * 1000))
            const weekNow = Math.ceil(( dateNow.getDay() + 1 + numberOfDays) / 7)
            if(time === "Today"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth() && date.getDate() === dateNow.getDate()
                    )
                }))
            }else if(time === "This week"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    let weekThen
                    const oneJan = new Date(date.getFullYear(),0,1)
                    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
                    weekThen = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7)
                    return(date.getFullYear() === dateNow.getFullYear() && weekNow === weekThen)
                }))
            }else if(time === "Last week"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    let weekThen
                    const oneJan = new Date(date.getFullYear(),0,1)
                    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
                    weekThen = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7)
                    return(date.getFullYear() === dateNow.getFullYear() && weekNow  === weekThen -1)
                }))
            }else if(time === "This month"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()
                    )
                }))
            }else if(time === "Last month"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear() && date.getMonth() === (dateNow.getMonth() -1)
                    )
                }))
            }else if(time === "This year"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === dateNow.getFullYear()
                    )
                }))
            }else if(time === "Last year"){
                return(transactions.filter(transaction => {
                    const date = new Date(transaction.details.completed)
                    return(
                        date.getFullYear() === (dateNow.getFullYear() - 1)
                    )
                }))
            }else if(time === "All"){
                return transactions
            }
        }
        let filteredTransactions = filterTransactions(transactions, timeFilter)
        filteredTransactions = filteredTransactions.map(transaction => {
            const date = new Date(transaction.details.completed)
            const newDate =  date.getFullYear()+"-" + (date.getMonth()+1) + "-"+date.getDate()
            return { ...transaction, details: { ...transaction.details, completed: newDate } }
        })
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
                } },
        }
        if(filteredTransactions.length !== 0){
            return(
                <div >
                    <h3>{`Balance: €${balance.amount}`}</h3>
                    <div style ={{ height: "500px", width: "1000px" }} className="mb-4">
                        <Line data={data} options={options} />
                    </div>
                    <hr className ="mb-8 mt-8"/>
                    <TransactionList transactions = {filteredTransactions}/>
                </div>
            )
        }else {
            return (
                <div>
                    <h3>{`Balance: €${balance.amount}`}</h3>
                    {`No transactions ${timeFilter}`}
                </div>
            )
        }
    }else if(balance){
        return (
            <div>
                <h3>{`Balance: €${balance.amount}`}</h3>
                No recent transactions
            </div>
        )
    }
}

export default SingleAccounts