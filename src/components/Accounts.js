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
                                <div className="flex items-center justify-center w-full h-full">
                                    <div className="flex justify-center items-center space-x-1 text-sm text-gray-700 ">

                                        <svg fill='none' className="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clipRule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fillRule='evenodd' />
                                        </svg>


                                        <div className ="text-3xl">Loading ...</div>
                                    </div>
                                </div>
                            }
                        </ul>
                    </div>
                    <button onClick ={handleRevoke} className ="px-4 py-3 bg-gray-200 text-gray-500 text-xs font-semibold rounded hover:bg-gray-600 hover:text-white">Revoke Consent</button>
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