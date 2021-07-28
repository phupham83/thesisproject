import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"
import Button from "../utils/Button"
import Loading from "../utils/Loading"
import { reset } from "../../reducers/choiceReducer"
import { grantView } from "../../reducers/userReducer"
import { getAccounts } from "../../reducers/userReducer"
import ChooseAccount from "./ChooseAccount"
import ChooseBank from "./ChooseBank"

const Choose = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAccounts(user))
    }, [])
    const banksChoice = useSelector(state => state.choice.banks)
    const stateId = useSelector(state => state.choice.accounts)

    const handleConfirm = (event) => {
        event.preventDefault()
        dispatch(grantView(stateId, user.accountIds))
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
    return(
        <div>
            {user.accounts ?
                <ChooseBank/>
                :
                <Loading/>
            }
            {filteredAccounts[0] ?
                <ChooseAccount filteredAccounts = {filteredAccounts} />
                :
                <div></div> }
            <Button cb ={handleConfirm} text ="Confirm"/>
        </div>
    )
}

export default Choose