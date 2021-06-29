import React from "react"
import { useSelector } from "react-redux"

const Accounts = () => {
    const user = useSelector(state => state.user)
    const handleAccount = (event) =>{
        event.preventDefault()
    }
    return(
        <div>
            <h1>Accounts</h1>
            {user.consent ? 
            <p>Hello world!</p>
            :
            <div>
                <p>Please add an account to start</p>
                <button onSubmit ={handleAccount}>Add account</button>
            </div>  
        }
        </div>
    )
}

export default Accounts