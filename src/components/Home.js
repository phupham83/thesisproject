import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NoAccounts from "./transactions/NoAccounts"
import { getTransactions } from "../reducers/userReducer"
import { Doughnut } from "react-chartjs-2"
import Loading from "./utils/Loading"


const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [])
    const sumReducer = (initial,nextValue) => {
        return initial + parseFloat(nextValue)
    }
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }
    const hasBalance = user.accounts ?
        user.accounts[0].balance ? true : false : false
    const allTransactionsArrays = user.accounts ?
        user.accounts[0].transactions ?
            user.accounts.map(account => account.transactions)
            : null
        : null
    const allTransactions =  allTransactionsArrays ? allTransactionsArrays.reduce(reducer, []) : []

    const allExpensesArrays = allTransactions ?
        allTransactions.filter(transaction => parseFloat(transaction.details.value.amount) < 0)
        : null
    const allExpenses = allExpensesArrays ? allExpensesArrays.map(expense => expense.details.value.amount) : []
    const totalExpenses = allExpenses ? allExpenses.reduce(sumReducer,0) : 0

    const allIncomesArrays = allTransactions ?
        allTransactions.filter(transaction => parseFloat(transaction.details.value.amount) > 0)
        : null
    const allIncomes = allIncomesArrays ? allIncomesArrays.map(expense => expense.details.value.amount) : []
    const totalIncomes = allIncomes ? allIncomes.reduce(sumReducer,0) : 0

    const dataExpenses = {
        labels: ["General expenses", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [totalExpenses, 0, 0, 0, 0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const dataIncomes = {
        labels: ["Red", "Blue", "Yellow", "General Income", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [0, 0, 0, totalIncomes, 0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const pluginsExpenses = [{
        beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx
            ctx.restore()
            var fontSize = (height / 200).toFixed(2)
            ctx.font = fontSize + "em sans-serif"
            ctx.textBaseline = "top"
            var text = `-£${-totalExpenses.toFixed(2)}`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.1
            ctx.fillText(text, textX, textY)
            ctx.save()
        }
    }]

    const pluginsIncomes = [{
        beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx
            ctx.restore()
            var fontSize = (height / 200).toFixed(2)
            ctx.font = fontSize + "em sans-serif"
            ctx.textBaseline = "top"
            var text = `+£${totalIncomes.toFixed(2)}`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.1
            ctx.fillText(text, textX, textY)
            ctx.save()
        }
    }]

    const options= {
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    return(
        <div>
            <h1 >Welcome to your budget planner</h1>
            {user.consent ?
                <div>
                    <div >
                        {totalExpenses === 0 ?
                            hasBalance === false ?
                                <Loading />
                                :
                                <h3>No recent transactions</h3>
                            :
                            <div >
                                <div className ="inline-block h-300px w-300px">
                                    <Doughnut data={dataIncomes} plugins={pluginsIncomes} options ={options}/>
                                    <h3 className ="px-20">Income</h3>
                                </div>
                                <div className ="inline-block h-300px w-300px ml-4" >
                                    <Doughnut data={dataExpenses} plugins={pluginsExpenses} options ={options}/>
                                    <h3 className ="px-20">Expenses</h3>
                                </div>
                            </div>
                        }
                    </div>
                    <p>You can start by checking the Accounts you have added to the Application</p>
                    <p>Or look at your Transactions</p>
                </div>
                : <NoAccounts />
            }
        </div>
    )
}

export default Home