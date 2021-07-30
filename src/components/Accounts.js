import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { revokeConsentSingle } from "../reducers/userReducer"
import Loading from "./utils/Loading"
import Button from "./utils/Button"
import NoAccounts from "./transactions/NoAccounts"
import { getTransactions } from "../reducers/userReducer"

const Accounts = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTransactions(user))
    }, [dispatch])
    const handleAddAccount = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    const handleRevokeAccount = ( account, bank ) => {
        dispatch(revokeConsentSingle(user, account, bank))
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
                                {for(let i = 0; user.accountIds.length > i; i++){
                                    if(user.accountIds[i].account === account.id){
                                        return(
                                            <li key = {account.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                                <img className="w-10 h-10 md:w-20 md:h-20 mr-2 rounded-md overflow-hidden inline-block shadow-md" src={account.bank.logo} />
                                                <div className ="inline-block"><b>{account.bank.full_name}:</b> {account.id}</div>
                                                <br/>
                                                <div className ="mt-4">
                                                    <Button cb = {() => handleRevokeAccount(account.id, account.bank.bank_id)} text ="Revoke Consent" />
                                                </div>
                                            </li>
                                        )
                                    }
                                }}
                                )
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