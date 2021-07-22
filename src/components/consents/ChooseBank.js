import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"
import Button from "../utils/Button"
import Loading from "../Loading"
import { setBank, removeBank, setAccount, removeAccount, reset } from "../../reducers/choiceReducer"
import { grantView } from "../../reducers/userReducer"
import { getAccounts } from "../../reducers/userReducer"

const ChooseBank = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAccounts(user))
    }, [])
    const banksChoice = useSelector(state => state.choice.banks)
    const stateId = useSelector(state => state.choice.accounts)
    const handleBankChoice = (event) => {
        const bank = event.target.name
        if(event.target.checked === true){
            dispatch(setBank(bank))
        }else{
            dispatch(removeBank(bank))
        }
    }
    const handleAccountChoice = (event) => {
        const account = event.target.name
        const bank = event.target.value
        if(event.target.checked === true){
            dispatch(setAccount(account, bank))
        }else{
            dispatch(removeAccount(account, bank))
        }
    }
    const handleConfirm = (event) => {
        event.preventDefault()
        dispatch(grantView(stateId))
        dispatch(reset())
        history.push("/")
    }
    const accountsFilter = (accounts, currentAccount) => {
        for(let i = 0; banksChoice.length > i; i++ ){
            if(banksChoice[i] === currentAccount.bank_id){
                accounts.push(currentAccount)
            }
        }
        return accounts
    }
    const filteredAccounts = user.accounts ? user.accounts.reduce(accountsFilter, []): []
    let banks =[]
    return(
        <div>
            {user.accounts ?
                <div>
                    <h1>Choose Banks</h1>
                    {user.accounts.map(account =>
                    {for(let i = 0; banks.length > i; i++ ){
                        if(banks[i] === account.bank_id){
                            return(<div key = {account.id}></div>)
                        }
                    }
                    banks.push(account.bank_id)
                    return(
                        <div key = {account.id}>
                            <input type ="checkbox" name = {account.bank_id} onChange ={handleBankChoice} />
                            {account.bank_id}
                        </div>
                    )}
                    )}
                </div>
                :
                <Loading/>
            }

            {filteredAccounts[0] ?
                <div>
                    <h1>Choose Accounts</h1>
                    {filteredAccounts.map(account =>
                        <div key = {account.id}>
                            <input type ="checkbox" name = {account.id} onChange = {handleAccountChoice} value ={account.bank_id} />
                            {account.id}({account.bank_id})
                        </div>
                    )}
                </div>
                :
                <div></div> }
            <Button cb ={handleConfirm} text ="Confirm"/>
        </div>
    )
}

export default ChooseBank