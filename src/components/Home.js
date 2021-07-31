import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NoAccounts from "./transactions/NoAccounts"
import { getTransactions } from "../reducers/userReducer"
import { Doughnut } from "react-chartjs-2"
import Loading from "./utils/Loading"
import TimeFilter from "./utils/TimeFilter"


const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const timeFilter = useSelector(state => state.timeFilter)
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

    const filteredTransactions = filterTransactions(allTransactions, timeFilter)

    const allExpensesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => parseFloat(transaction.details.value.amount) < 0)
        : null
    const allExpensesBillsArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Bills")
        : null
    const allExpensesGroceriesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Groceries")
        : null
    const allExpensesFoodDrinkArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Food & Drink")
        : null
    const allExpensesTransportArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Transport")
        : null

    const allExpensesBills = allExpensesBillsArrays ? allExpensesBillsArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesGroceries = allExpensesGroceriesArrays ? allExpensesGroceriesArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesFoodDrink = allExpensesFoodDrinkArrays ? allExpensesFoodDrinkArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesTransport = allExpensesTransportArrays ? allExpensesTransportArrays.map(expense => expense.details.value.amount) : 0
    const allExpenses = allExpensesArrays ? allExpensesArrays.map(expense => expense.details.value.amount) : []

    const totalExpenses = allExpenses ? allExpenses.reduce(sumReducer,0): 0
    const totalExpensesBills = allExpensesBills ? allExpensesBills.reduce(sumReducer,0): 0
    const totalExpensesGroceries = allExpensesGroceries ? allExpensesGroceries.reduce(sumReducer,0): 0
    const totalExpensesFoodDrink = allExpensesFoodDrink ? allExpensesFoodDrink.reduce(sumReducer,0): 0
    const totalExpensesTransport = allExpensesTransport ? allExpensesTransport.reduce(sumReducer,0): 0
    const generalExpenses = totalExpenses  - totalExpensesBills - totalExpensesGroceries - totalExpensesFoodDrink - totalExpensesTransport

    const allIncomesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => parseFloat(transaction.details.value.amount) > 0)
        : null
    const allIncomesIncomeArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Income")
        : null

    const allIncomes = allIncomesArrays ? allIncomesArrays.map(income => income.details.value.amount) : []
    const allIncomesIncome = allIncomesIncomeArrays ? allIncomesIncomeArrays.map(income => income.details.value.amount) : 0
    const totalIncomesIncome = allIncomesIncome ? allIncomesIncome.reduce(sumReducer,0) : 0
    const totalIncomes = allIncomes ? allIncomes.reduce(sumReducer,0) : 0
    const generalIncomes = totalIncomes - totalIncomesIncome
    const dataExpenses = {
        labels: ["General expenses", "Bills", "Groceries", "Food & Drink", "Transport", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [generalExpenses, totalExpensesBills, totalExpensesGroceries, totalExpensesFoodDrink, totalExpensesTransport, 0],
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
        labels: ["Red", "Blue", "Yellow", "General Income", "Income", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [0, 0, 0, generalIncomes, totalIncomesIncome, 0],
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
                borderWidth: 1.5,
            },
        ],
    }


    const options= {
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    return(
        <div className="p-10">
            <h1 className ="mb-4">Welcome to your budget planner</h1>
            {user.consent ?
                <div>
                    <div >
                        {filteredTransactions.length === 0 ?
                            hasBalance === false ?
                                <Loading />
                                :
                                <div>
                                    <h3>{`No recent transactions ${timeFilter}`}</h3>
                                    <TimeFilter />
                                </div>
                            :
                            <div className ="mt-8">
                                <div className =" inline-block " style ={{ height: "400px", width: "400px" }} >
                                    <Doughnut data={dataIncomes} options ={options}/>
                                    <h3 className ="px-20 pt-6">{`Income: +€${totalIncomes.toFixed(2)}`}</h3>
                                </div>
                                <div className =" inline-block ml-4 " style ={{ height: "400px", width: "400px" }} >
                                    <Doughnut data={dataExpenses} options ={options}/>
                                    <h3 className ="px-20 pt-6">{`Expenses: -€${-totalExpenses.toFixed(2)}`}</h3>
                                </div>
                                <span>Time period: </span>
                                <TimeFilter />
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