import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getAccounts, revokeConsent } from "../reducers/userReducer"
import Loading from "./Loading"
import Button from "./utils/Button"
import NoAccounts from "./transactions/NoAccounts"

const Accounts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAccounts(user))
    }, [])
    const handleRevoke = (event) => {
        event.preventDefault()
        dispatch(revokeConsent())
    }
    return(
        <div>
            <h1>Accounts</h1>
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
                <NoAccounts />
            }
        </div>
    )
}

export default Accounts