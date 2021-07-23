import React from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { revokeConsentSingle } from "../reducers/userReducer"
import Loading from "./Loading"
import Button from "./utils/Button"
import NoAccounts from "./transactions/NoAccounts"

const Accounts = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleAddAccount = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    const handleRevokeAccount = ( account, bank ) => {
        console.log(account)
        console.log(bank)
        dispatch(revokeConsentSingle(account, bank))
    }
    return(
        <div>
            <h1>Accounts</h1>
            {user.consent ?
                <div>
                    <div className = "bg-white shadow-xl rounded-lg w-1/2">
                        <ul className="divide-y divide-gray-300">
                            {user.accountIds ?
                                user.accountIds.map(account =>
                                    <li key = {account.account} className="p-4 hover:bg-gray-50 cursor-pointer">
                                        Bank: {account.bank} <br/>
                                        Account: {account.account} <Button cb = {() => handleRevokeAccount(account.account, account.bank)} text ="Revoke Consent Single" />
                                    </li>)
                                :
                                <Loading />
                            }
                        </ul>
                    </div>
                    <Button cb = {handleAddAccount} text ="Add Account" />
                </div>
                :
                <NoAccounts />
            }
        </div>
    )
}

export default Accounts