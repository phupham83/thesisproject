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
        <div className="flex justify-center">
            {user.consent ?
                <div className="flex-initial px-8 py-8 pt-8">
                    <h1 className ="mb-4">Accounts</h1>
                    <hr className ="mb-8"/>
                    <div className = "bg-white shadow-xl rounded-lg ">
                        <ul className="divide-y divide-gray-300">
                            {user.accounts ?
                                user.accounts.map(account =>
                                {for(let i = 0; user.accountIds.length > i; i++){
                                    if(user.accountIds[i].account === account.id){
                                        return(
                                            <li key = {account.id} className="flex p-4 hover:bg-gray-50 cursor-pointer justify-between items-center">
                                                <img className="flex-intial w-10 h-10 md:w-20 md:h-20 mr-2 rounded-md overflow-hidden  shadow-md" src={account.bank.logo} />
                                                <div className ="flex-1 ml-10 mr-10 "><b>{account.bank.full_name}:</b> {account.id}</div>
                                                <div className ="flex-intial">
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
                    <div className ="mt-4 ml-4">
                        <Button cb = {handleAddAccount} text ="Add Account" />
                    </div>
                </div>
                :
                <div>
                    <h1 className ="mb-4">Accounts</h1>
                    <NoAccounts />
                </div>
            }
        </div>
    )
}

export default Accounts