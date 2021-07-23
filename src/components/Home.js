import React from "react"
import {  useSelector } from "react-redux"
import NoAccounts from "./transactions/NoAccounts"


const Home = () => {
    const user = useSelector(state => state.user)
    return(
        <div>
            <h1 >Welcome to your budget planner</h1>
            {user.consent ?
                <p>Go to Accounts</p>
                : <NoAccounts /> }
        </div>
    )
}

export default Home