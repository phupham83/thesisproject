import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {  getAccounts } from "../reducers/userReducer"
import { useHistory } from "react-router"

const Accounts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAccounts(user))
    }, [dispatch])

    const handleAccountAuth = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    return(
        <div>
            <h1>Accounts</h1>
            {user.consent ?
                <div>
                    {user.accounts}
                </div>
                :
                <div>
                    <p>Please add an account to start</p>
                    <button onClick ={handleAccountAuth}>Add account</button>
                </div>
            }
        </div>
    )
}

export default Accounts