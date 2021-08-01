import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {  setAccount, removeAccount } from "../../reducers/choiceReducer"

const ChooseAccount = ({ filteredAccounts }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleAccountChoice = (event) => {
        const account = event.target.name
        const bank = event.target.value
        if(event.target.checked === true){
            dispatch(setAccount(account, bank))
        }else{
            dispatch(removeAccount(account, bank))
        }
    }
    return(
        <div>
            <h1>Choose Accounts</h1>
            <div className = "bg-white shadow-xl rounded-lg">
                <ul className="divide-y divide-gray-300">
                    {filteredAccounts.map(account =>
                    {
                        for(let i = 0; user.accountIds.length > i; i++ ){
                            if(user.accountIds[i].account === account.id ){
                                return(<div key = {account.id}></div>)
                            }
                        }
                        return(
                            <li key = {account.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                <label className="flex items-center relative w-max cursor-pointer select-none">
                                    <img className="w-10 h-10 md:w-20 md:h-20 mr-2 rounded-md overflow-hidden inline-block shadow-md" src={account.bank.logo} />
                                    <span className="mr-3">{account.id}</span>
                                    <input type ="checkbox" name = {account.id} onChange = {handleAccountChoice} value ={account.bank_id}
                                        className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full bg-gray-100"
                                    />
                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" ></span>
                                </label>
                            </li>)}
                    )}
                </ul>
            </div>
        </div>

    )
}

export default ChooseAccount