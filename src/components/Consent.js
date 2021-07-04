import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getConsent } from "../reducers/userReducer"
import { Redirect } from "react-router"

const Consent = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleConfirm =(event) => {
        event.preventDefault()
        dispatch(getConsent())
    }
    return(
        <div>
            {user ? <div>
                <h1>Consent confirmation</h1>
                <p>By accepting you are allowing your data to be accessed</p>
                <button onClick ={handleConfirm}>Confirm</button>
            </div> :
                <Redirect to ="/"/>
            }
        </div>
    )
}

export default Consent