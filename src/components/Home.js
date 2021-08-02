import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import NoAccounts from "./transactions/NoAccounts"
import { getTransactions } from "../reducers/userReducer"
import Loading from "./utils/Loading"
import { Bar } from "react-chartjs-2"
import setCategories from "../categories"
import Button from "./utils/Button"

const Budget = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const history = useHistory()
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [])
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }

    const daysInMonths = [31,29,31,30,31,30,31,31,30,31,30,31]
    const date = new Date()
    const handleBudgetRedirect = (event) => {
        event.preventDefault()
        user.budget ?
            history.push("/updateBudget"):
            history.push("/setBudget")
    }

    const allTransactionsArrays = user.accounts ?
        user.accounts[0].transactions ?
            user.accounts.map(account => account.transactions)
            : null
        : null
    const allTransactions =  allTransactionsArrays ? allTransactionsArrays.reduce(reducer, []) : []


    const categoriesTotal = setCategories(allTransactions, "This month")
    const totalBudget = user.budget[0] +user.budget[1] +user.budget[2] +user.budget[3] +user.budget[4]
    const data = {
        labels: ["Total Expenses", "Bills", "Transport", "Food and Drink", "Groceries", "General Expense"],
        datasets: [
            {
                label: "Actual",
                data: [-categoriesTotal.totalExpenses, -categoriesTotal.bills, -categoriesTotal.transport, -categoriesTotal.foodDrink, -categoriesTotal.groceries, -categoriesTotal.generalExpense],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
                label: "Budget Goal",
                data: [totalBudget, user.budget[0], user.budget[2], user.budget[1], user.budget[3], user.budget[4]],
                backgroundColor: "rgba(193, 185, 185, 0.5)",
            },
        ],
    }

    const options = {
        indexAxis: "y",
        scales: {
            yAxes: {
                grid: { display: false, },
                stacked: true
            },
            xAxes: {
                stacked: true
            }
        },
    }
    console.log()
    return(
        <div className="flex justify-center">
            {user.consent ?
                user.budget ?
                    <div className="px-8 py-8 pt-8">
                        <h1 className ="mb-4">{`Hi ${user.name}, welcome to your budget planner`}</h1>
                        <hr className ="mb-8"/>
                        {categoriesTotal.filteredLength !== 0 ?
                            <div >
                                {totalBudget + categoriesTotal.totalExpenses > 0 ?
                                    <span className ="mb-8 bg-green-100 text-green-600 rounded-full p-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {`You are on track with ${daysInMonths[date.getMonth()] - date.getDate()} days left`}
                                    </span>
                                    :
                                    <span className ="mb-8 bg-gray-100 text-black rounded-full p-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        {`You are over budget by €${-(totalBudget + categoriesTotal.totalExpenses).toFixed(2)}`}
                                    </span>
                                }
                                <div className ="mb-8" style ={{ height: "400px", width: "800px" }}>
                                    <Bar data={data} options={options} />
                                </div>
                                <hr className ="mb-8"/>
                                <Button cb ={handleBudgetRedirect} text="Update Budget"/>
                            </div>
                            :
                            <Loading />
                        }
                    </div>
                    :
                    <div>
                        <h1 className ="mb-4">{`Hi ${user.name}, welcome to your budget planner`}</h1>
                        <hr className ="mb-8"/>
                        <p>Set a budget to start</p>
                        <Button cb ={handleBudgetRedirect} text="Set Budget"/>
                    </div>
                :
                <div>
                    <h1 className ="mb-4">{`Hi ${user.name}, welcome to your budget planner`}</h1>
                    <hr className ="mb-8"/>
                    <NoAccounts />
                </div>
            }
        </div>
    )
}

export default Budget