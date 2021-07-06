import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getTransactions } from "../reducers/userReducer"
import {  getAccounts } from "../reducers/userReducer"
import { useHistory } from "react-router"

const Transaction = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const bankid = "gh.29.fi"
    const id = "9c0502d7-c076-424d-a2bc-cb689edb4734"
    useEffect(() => {
        dispatch(getTransactions(user, bankid, id))
        dispatch(getAccounts(user))
    }, [dispatch])
    const history = useHistory()
    const handleAccountAuth = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    return(
        <div>
            <h1>Transactions</h1>
            {user.consent ?
                <div>
                    <ul>
                        {user.transactions.map(transaction =>
                            <li key = {transaction.id}>
                        Balance: {transaction.details.new_balance.amount} Transfer amount: {transaction.details.value.amount} Description: {transaction.details.description}
                            </li>)}
                    </ul>
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