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
    const allTransactionsArrays = user.accounts.map(account => account.transactions)
    const reducer = (a,b) => {
        if(a){
            return [...b, ...a]
        }
        return b
    }
    const allTransactions = allTransactionsArrays.reduce(reducer, [])
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
                            {user.accounts.map(account =>
                                <Link to = {"/transactions/" + account.bank_id + "/" + account.id} key ={account.id}>
                                    <button>{account.bank_id}</button>
                                </Link>)}
                        </div>
                        <Switch>
                            {user.accounts.map(account =>
                                <Route path = {"/transactions/" + account.bank_id + "/" + account.id} key = {account.id}>
                                    <SingleAccounts transactions = {account.transactions}/>
                                </Route>)}
                            <Route path ="/transactions/All_accounts">
                                <AllAccounts transactions = {allTransactions}/>
                            </Route>
                            <Route exact path ="/transactions">
                                <AllAccounts transactions = {allTransactions}/>
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