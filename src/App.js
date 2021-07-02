import React, { useEffect } from "react"
import {  useDispatch, useSelector } from 'react-redux'
import NoMatch from "./components/NoMatch"
import Transaction from "./components/Transaction"
import Login from "./components/Login"
import Logout from "./components/Logout"
import SignUp from "./components/SignUp"
import Consent from "./components/Consent"
import Accounts from "./components/Accounts"
import { localLogin  } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () =>{
  const dispatch = useDispatch()
  useEffect(() => {
        dispatch(localLogin())
    }, [dispatch])

  const user = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

return (
    <div>
        {user === null ?
        <Router>
            <Switch>
                <Route path ="/login">
                    <Link style={padding} to="/">Home</Link> 
                    <Login />
                </Route>
                <Route path ="/signup">
                    <Link style={padding} to="/">Home</Link> 
                    <SignUp />
                </Route>
                <Route exact path ="/">
                    <div>
                        <Link style={padding} to="/login">Login</Link>
                        <Link style={padding} to="/signup">Sign Up</Link>
                    </div>
                </Route>
                <Route path = "*">
                    <Link style={padding} to="/">Home</Link> 
                    <NoMatch />
                </Route> 
            </Switch>
        </Router>
        :
        <Router>
            <div>
                <Link style={padding} to="/transactions">Transactions</Link>
                <Link style={padding} to="/accounts">Accounts</Link>
                <Link style={padding} to="/">Home</Link>
                <p>{user.username} logged in <Logout /></p>
            </div>
            <Switch>
                <Route path ="/transactions">
                    <Transaction />
                </Route>
                <Route path = "/accounts">
                    <Accounts />
                </Route>
                <Route path = "/consent">
                    <Consent/>
                </Route>
                <Route exact path ="/">
                    <h1>Welcome to your budget planner</h1>
                </Route>
                <Route path ="*">
                    <Link style={padding} to="/">Home</Link>
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    }
    </div>
    
)
}

export default App
