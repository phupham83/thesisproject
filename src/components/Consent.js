import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { confirmConsent } from "../reducers/userReducer"
import { Redirect,useHistory } from 'react-router'

const Consent = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const cb = () => history.push("/")
    const handleConfirm =(event) =>{
    event.preventDefault()
    dispatch(confirmConsent(user.id, cb))
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