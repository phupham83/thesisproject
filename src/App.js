import React, { useEffect } from "react"
import Transaction from "./components/Transaction"
import Login from "./components/Login"
import {  useDispatch, useSelector } from 'react-redux'
import { initializeTransactions } from "./reducers/transactionReducer"
import { localLogin } from './reducers/loginReducer'

const App = () =>{
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(localLogin(user))
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeTransactions())
  }, [dispatch])
  
  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <Login />
      )
}
  return(
    <div>
      <Transaction />
    </div>
  )
}

export default App
