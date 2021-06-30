import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getConsent, getAccounts } from "../reducers/userReducer"

const Accounts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(()=>{
        dispatch(getAccounts(user))
    }, [dispatch])
    
    const handleAccountAuth = (event) =>{
        event.preventDefault()
        dispatch(getConsent(user.id))
    }
    return(
        <div>
            <h1>Accounts</h1>
            {user.consent[0] ? 
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