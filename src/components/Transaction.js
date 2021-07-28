import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTransactions } from "../reducers/userReducer"
import AllAccounts from "./transactions/AllAccounts"
import SingleAccounts from "./transactions/SingleAccount"
import Button from "./utils/Button"
import NoAccounts from "./transactions/NoAccounts"
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"


const Transaction = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [])
    const handleRefresh = (event) => {
        event.preventDefault()
        dispatch(getTransactions(user))
    }
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }
    const sumReducer = (initial,nextValue) => {
        return initial + parseFloat(nextValue.amount)
    }
    const accounts = user.accounts ? user.accounts : []
    const allTransactionsArrays = user.accounts ?
        user.accounts[0].transactions ?
            user.accounts.map(account => account.transactions)
            : null
        : null

    const allBalancesArrays = user.accounts ?
        user.accounts[0].balance ?
            user.accounts.map(account => account.balance)
            : null
        : null

    const allTransactions =  allTransactionsArrays ? allTransactionsArrays.reduce(reducer, []) : []
    const totalBalance = allBalancesArrays ? allBalancesArrays.reduce(sumReducer,0) : 0
    return(
        <div>
            <h1>Transactions</h1>
            {user.consent ?
                <div>
                    <Router>
                        <div className = "space-x-4" >
                            <Link to = {"/transactions/All_accounts"}>
                                <Button text ="All Accounts" />
                            </Link>
                            {accounts.map(account =>
                                <Link to = {"/transactions/" + account.bank_id + "/" + account.id} key ={account.id}>
                                    <Button text ={account.bank_id} />
                                </Link>)}
                            <Button cb = { handleRefresh } text ="Refresh" />
                        </div>
                        <Switch>
                            {accounts.map(account =>
                                <Route path = {"/transactions/" + account.bank_id + "/" + account.id} key = {account.id}>
                                    <SingleAccounts transactions = {account.transactions} balance = {account.balance}/>
                                </Route>)}
                            <Route path ="/transactions/All_accounts">
                                <AllAccounts transactions = {allTransactions} totalBalance = {totalBalance}/>
                            </Route>
                            <Route exact path ="/transactions">
                                <AllAccounts transactions = {allTransactions} totalBalance = {totalBalance}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                :
                <NoAccounts />
            }
        </div>

    )
}

export default Transaction