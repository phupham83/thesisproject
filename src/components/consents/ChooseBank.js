import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBank, removeBank } from "../../reducers/choiceReducer"

const ChooseBank = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleBankChoice = (event) => {
        const bank = event.target.name
        if(event.target.checked === true){
            dispatch(setBank(bank))
        }else{
            dispatch(removeBank(bank))
        }
    }
    let banks =[]
    return(
        <div>
            <h1>Choose Banks</h1>
            <div className = "bg-white shadow-xl rounded-lg">
                <ul className="divide-y divide-gray-300">
                    {user.accounts.map(account =>
                    {for(let i = 0; banks.length > i; i++ ){
                        if(banks[i] === account.bank_id ){
                            return true
                        }
                    }
                    for(let i = 0; user.accountIds.length > i; i++ ){
                        if(user.accountIds[i].account === account.id ){
                            return true
                        }
                    }
                    banks.push(account.bank_id)
                    return(
                        <li key = {account.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                            <label className="flex items-center relative w-max cursor-pointer select-none ">
                                <img className=" w-10 h-10 md:w-20 md:h-20 mr-2 rounded-md overflow-hidden inline-block shadow-md" src={account.bank.logo} />
                                <span className="mr-3 ">{account.bank.full_name}</span>
                                <input type ="checkbox" name = {account.bank_id} onChange ={handleBankChoice}
                                    className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full bg-gray-100"/>
                                <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" ></span>
                            </label>
                        </li>
                    )}
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ChooseBank