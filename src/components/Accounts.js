import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getAccounts, revokeConsent } from "../reducers/userReducer"
import { useHistory } from "react-router"
import Loading from "./Loading"
import Button from "./utils/Button"

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
            <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">Accounts</h1>
            {user.consent ?
                <div>
                    <div className = "bg-white shadow-xl rounded-lg w-1/2">
                        <ul className="divide-y divide-gray-300">
                            {user.accounts ?
                                user.accounts.map(account =>
                                    <li key = {account.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                        {account.bank_id}
                                    </li>)
                                :
                                <Loading />
                            }
                        </ul>
                    </div>
                    <Button cb = {handleRevoke} text ="Revoke Consent" />
                </div>
                :
                <div className ="addAccount">
                    <p>Please add an account to start</p>
                    <Button cb ={handleAccountAuth} text ="Add Account"/>
                </div>
            }
        </div>
    )
}

export default Accounts