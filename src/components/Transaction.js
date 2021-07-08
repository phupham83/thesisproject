import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getTransactions } from "../reducers/userReducer"
import { useHistory } from "react-router"
import AllAccounts from "./transactions/AllAccounts"
import SingleAccounts from "./transactions/SingleAccount"
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"


const Transaction = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [dispatch])
    const history = useHistory()
    const handleAccountAuth = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }
    const sumReducer = (initial,nextValue) => {
        const reducer = (a,b) => {
            return a + Number(b.amount)
        }
        const sum = nextValue.reduce(reducer,0)
        return initial + sum
    }
    const accounts = user.accounts ? user.accounts : []
    const allTransactionsArrays = user.accounts ?
        user.accounts[0].transactions ?
            user.accounts.map(account => account.transactions)
            : null
        : null

    const allBalancesArrays = user.accounts ?
        user.accounts[0].balances ?
            user.accounts.map(account => account.balances)
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
                        <div>
                            <Link to = {"/transactions/All_accounts"}>
                                <button>All accounts</button>
                            </Link>
                            {accounts.map(account =>
                                <Link to = {"/transactions/" + account.bank_id + "/" + account.id} key ={account.id}>
                                    <button>{account.bank_id}</button>
                                </Link>)}
                        </div>
                        <Switch>
                            {accounts.map(account =>
                                <Route path = {"/transactions/" + account.bank_id + "/" + account.id} key = {account.id}>
                                    <SingleAccounts transactions = {account.transactions} balances = {account.balances}/>
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
                <div className ="addAccount">
                    <p>Please add an account to start</p>
                    <button onClick ={handleAccountAuth}>Add account</button>
                </div>
            }
        </div>

    )
}

export default Transaction