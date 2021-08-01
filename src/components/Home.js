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
        }else if(time === "This month"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()
                )
            }))
        }else if(time === "This week"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                let weekThen
                if(date.getFullYear() === dateNow.getFullYear()){
                    const oneJan = new Date(date.getFullYear(),0,1)
                    const numberOfDays = Math.floor((date- oneJan) / (24 * 60 * 60 * 1000))
                    weekThen = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7)
                    return(weekNow === weekThen)
                }
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
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0)",
                    "rgba(54, 162, 235, 0)",
                    "rgba(255, 206, 86, 0)",
                    "rgba(75, 192, 192, 0)",
                    "rgba(153, 102, 255, 0)",
                    "rgba(255, 159, 64, 0)",
                ],
                borderWidth: 0,
                borderRadius: 5,
                hoverOffset: 10,
                spacing: 2
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
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0)",
                    "rgba(54, 162, 235, 0)",
                    "rgba(255, 206, 86, 0)",
                    "rgba(75, 192, 192, 0)",
                    "rgba(153, 102, 255, 0)",
                    "rgba(255, 159, 64, 0)",
                ],
                borderWidth: 0,
                borderRadius: 5,
                hoverOffset: 10,
                spacing: 2
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

    const categories = ["Bills", "Groceries", "Food & Drink", "Transport", "General Expenses"]
    return(
        <div className="flex justify-center">
            {user.consent ?
                <div className="px-8 py-8 pt-8">
                    <h1 className ="mb-4">{`Hi ${user.name}, welcome to your budget planner`}</h1>
                    <hr className ="mb-8"/>
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
                                    <h3 className ="px-20 pt-6 text-green-600">{`Incomes: +€${totalIncomes.toFixed(2)}`}</h3>
                                </div>
                                <div className =" inline-block ml-4 " style ={{ height: "400px", width: "400px" }} >
                                    <Doughnut data={dataExpenses} options ={options}/>
                                    <h3 className ="px-20 pt-6">{`Expenses: -€${-totalExpenses.toFixed(2)}`}</h3>
                                </div>
                                <span>Time period: </span>
                                <TimeFilter />
                                <hr className="mt-8 mb-4"/>
                                <h3>Spendings</h3>
                                <ul className="divide-y divide-gray-300">
                                    {categories.map(category => {
                                        if(category === "Bills"){
                                            if(totalExpensesBills === 0){
                                                return true
                                            }
                                            return(
                                                <li key = {category} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                    <span className ="bg-blue-100 p-1.5 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                        </svg>
                                                    </span>
                                                    <div className ="flex-1 ml-10 mr-10 ">{category}</div>
                                                    <div className ="flex-intial">
                                                        <b>{`-€${-totalExpensesBills.toFixed(2)}`}</b>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        if(category === "Groceries"){
                                            if(totalExpensesGroceries === 0){
                                                return true
                                            }
                                            return(
                                                <li key = {category} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                    <span className ="bg-yellow-100 p-1.5 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className ="flex-1 ml-10 mr-10 ">{category}</div>
                                                    <div className ="flex-intial">
                                                        <b>{`-€${-totalExpensesGroceries.toFixed(2)}`}</b>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        if(category === "Food & Drink"){
                                            if(totalExpensesFoodDrink === 0){
                                                return true
                                            }
                                            return(
                                                <li key = {category} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                    <span className ="bg-green-100 p-1.5 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                                        </svg>
                                                    </span>
                                                    <div className ="flex-1 ml-10 mr-10 ">{category}</div>
                                                    <div className ="flex-intial">
                                                        <b>{`-€${-totalExpensesFoodDrink.toFixed(2)}`}</b>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        if(category === "Transport"){
                                            if(totalExpensesTransport === 0){
                                                return true
                                            }
                                            return(
                                                <li key = {category} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                    <span className ="bg-purple-200 p-1.5 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                                        </svg>
                                                    </span>
                                                    <div className ="flex-1 ml-10 mr-10 ">{category}</div>
                                                    <div className ="flex-intial">
                                                        <b>{`-€${-totalExpensesTransport.toFixed(2)}`}</b>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        if(category === "General Expenses"){
                                            if(generalExpenses === 0){
                                                return true
                                            }
                                            return(
                                                <li key = {category} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                    <span className ="bg-red-200 p-1.5 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                        </svg>
                                                    </span>
                                                    <div className ="flex-1 ml-10 mr-10 ">{category}</div>
                                                    <div className ="flex-intial">
                                                        <b>{`-€${-generalExpenses.toFixed(2)}`}</b>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                    <hr className="mt-8"/>
                    <p>You can start by checking the Accounts you have added to the Application</p>
                    <p>Or look at your Transactions</p>
                </div>
                :
                <div>
                    <h1 className ="mb-4">{`Hi ${user.name}, welcome to your budget planner`}</h1>
                    <NoAccounts />
                </div>
            }
        </div>
    )
}

export default Home