import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { setBudget } from "../../reducers/userReducer"
import { setBudgetChoice } from "../../reducers/budgetChoicesReducer"
import { getTransactions } from "../../reducers/userReducer"
import setCategories from "../../categories"
import Loading from "./Loading"

const SetBudget = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const budgetChoices = useSelector(state => state.budgetChoices)
    const totalBudget = budgetChoices.bills + budgetChoices.foodDrink + budgetChoices.transport + budgetChoices.groceries + budgetChoices.generalExpense
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }

    useEffect(() => {
        dispatch(getTransactions(user))
    }, [])
    const handleSetBudget = (event) => {
        event.preventDefault()
        const cb = () => {history.push("/")}
        const budget = [budgetChoices.bills, budgetChoices.foodDrink, budgetChoices.transport, budgetChoices.groceries, budgetChoices.generalExpense ]
        dispatch(setBudget(budget, cb))
    }
    const handleSetBudgetChoice = (event) => {
        const name = event.target.name
        const amount = event.target.value
        dispatch(setBudgetChoice({ name:name, amount:amount }))
    }

    const allTransactionsArrays = user.accounts ?
        user.accounts[0].transactions ?
            user.accounts.map(account => account.transactions)
            : null
        : null


    const allTransactions =  allTransactionsArrays ? allTransactionsArrays.reduce(reducer, []) : []
    const categoriesTotal = setCategories(allTransactions, "This month")
    useEffect(() => {
        dispatch(setBudgetChoice({ name:"Bills", amount:(-categoriesTotal.bills.toFixed(2)) }))
        dispatch(setBudgetChoice({ name:"FoodandDrink", amount:(-categoriesTotal.foodDrink.toFixed(2)) }))
        dispatch(setBudgetChoice({ name:"Transport", amount:(-categoriesTotal.transport.toFixed(2)) }))
        dispatch(setBudgetChoice({ name:"Groceries", amount:(-categoriesTotal.groceries.toFixed(2)) }))
        dispatch(setBudgetChoice({ name:"GeneralExpense", amount:(-categoriesTotal.generalExpense.toFixed(2)) }))
    }, [user])
    const inputStyle = " w-full  "
    return(
        <div >
            {user.consent ?
                categoriesTotal.filteredLength === 0 ?
                    <Loading />
                    :
                    <div className="flex justify-center">
                        <div>
                            <h1 className ="mb-4">Set Budget</h1>
                            <hr className ="mb-8"/>
                            <h3 className= "block px-4 ">{`Total budget: €${totalBudget.toFixed(2)}`}</h3>
                            <p className= "text-black block px-4 ">Select your budget for this month</p>
                            <p className= "text-black block px-4 ">Total expenses this month: <b>€{-categoriesTotal.totalExpenses.toFixed(2)}</b></p>
                            <form onSubmit={handleSetBudget} className=" bg-white shadow-md rounded px-8 py-8 pt-8 ">
                                <div className="px-4 pb-4  ">
                                    <span className ="flex items-center pb-2">
                                        <span className ="bg-blue-100 p-1.5 rounded ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </span>
                                        <label htmlFor="range" className="text-sm block font-bold pl-5">Bills</label>
                                    </span>
                                    <input
                                        type="range"
                                        name="Bills"
                                        id ="Bills"
                                        min = "0"
                                        max = "200"
                                        defaultValue = {String(-categoriesTotal.bills.toFixed(0))}
                                        className={inputStyle}
                                        onChange = {handleSetBudgetChoice}
                                    />
                                    <span className="inline-block" ><b>€{budgetChoices.bills}</b> (Spent: <b>€{-categoriesTotal.bills.toFixed(2)}</b> this month )</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <span className ="flex items-center pb-2">
                                        <span className ="bg-green-100 p-1.5 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                            </svg>
                                        </span>
                                        <label htmlFor="range" className="text-sm block font-bold pl-5">Food and Drink</label>
                                    </span>
                                    <input
                                        type="range"
                                        name="FoodandDrink"
                                        id ="FoodandDrink"
                                        min = "0"
                                        max = "200"
                                        defaultValue = {String(-categoriesTotal.foodDrink.toFixed(0))}
                                        className={inputStyle}
                                        onChange = {handleSetBudgetChoice}
                                    />
                                    <span className="inline-block"><b>€{budgetChoices.foodDrink}</b> (Spent: <b>€{-categoriesTotal.foodDrink.toFixed(2)}</b> this month )</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <span className ="flex items-center pb-2">
                                        <span className ="bg-purple-200 p-1.5 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                            </svg>
                                        </span>
                                        <label htmlFor="range" className="text-sm block font-bold pl-5">Transport</label>
                                    </span>
                                    <input
                                        type="range"
                                        name="Transport"
                                        id ="Transport"
                                        min = "0"
                                        max = "200"
                                        defaultValue = {String(-categoriesTotal.transport.toFixed(0))}
                                        className={inputStyle}
                                        onChange = {handleSetBudgetChoice}
                                    />
                                    <span className="inline-block"><b>€{budgetChoices.transport}</b> (Spent: <b>€{-categoriesTotal.transport.toFixed(2)}</b> this month )</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <span className ="flex items-center pb-2">
                                        <span className ="bg-yellow-100 p-1.5 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </span>
                                        <label htmlFor="range" className="text-sm block font-bold pl-5">Groceries</label>
                                    </span>
                                    <input
                                        type="range"
                                        name="Groceries"
                                        id ="Groceries"
                                        min = "0"
                                        max = "200"
                                        defaultValue = {String(-categoriesTotal.groceries.toFixed(0))}
                                        className={inputStyle}
                                        onChange = {handleSetBudgetChoice}
                                    />
                                    <span className="inline-block"><b>€{budgetChoices.groceries}</b> (Spent: <b>€{-categoriesTotal.groceries.toFixed(2)}</b> this month )</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <span className ="flex items-center pb-2">
                                        <span className ="bg-red-200 p-1.5 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </span>
                                        <label htmlFor="range" className="text-sm block font-bold pl-5">Groceries</label>
                                    </span>
                                    <input
                                        type="range"
                                        name="GeneralExpense"
                                        id ="GeneralExpense"
                                        min = "0"
                                        max = "200"
                                        defaultValue = {String(-categoriesTotal.generalExpense.toFixed(0))}
                                        className={inputStyle}
                                        onChange = {handleSetBudgetChoice}
                                    />
                                    <span className="inline-block"><b>€{budgetChoices.generalExpense}</b> (Spent: <b>€{-categoriesTotal.generalExpense.toFixed(2)}</b> this month )</span>
                                </div>
                                <button id ="login-button"type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                                Confirm
                                </button>
                            </form>
                        </div>
                        <div className="h-screen"></div>
                    </div>
                :
                <Loading />}
        </div>
    )
}

export default SetBudget