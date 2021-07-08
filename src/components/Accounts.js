import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getAccounts, revokeConsent } from "../reducers/userReducer"
import { useHistory } from "react-router"

const Accounts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAccounts(user))
    }, [])
    const history = useHistory()
    const handleAccountAuth = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    const handleRevoke = (event) => {
        event.preventDefault()
        dispatch(revokeConsent())
    }
    return(
        <div>
            <h1>Accounts</h1>
            {user.consent ?
                <div className = "showAccount">
                    <ul>
                        {user.accounts ?
                            user.accounts.map(account =>
                                <li key = {account.id}>
                                    {account.bank_id}
                                </li>)
                            :
                            <li>Loading</li>
                        }
                        {user.accounts ?
                            <button onClick ={handleRevoke} >Revoke Consent</button>
                            :
                            <li></li>}
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

export default Accounts