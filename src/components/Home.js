import React from "react"
import NoMatch from "./NoMatch"
import Transaction from "./Transaction"
import { logout } from "../reducers/loginReducer"
import Login from "./Login"
import SignUp from "./SignUp"
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const Home = () =>{
    const dispatch = useDispatch()
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
                    <Link style={padding} to="/">Home</Link>
                    <p>{user.username} logged in <button onClick ={() => dispatch(logout())}>Log out</button></p>
                </div>
                <Switch>
                    <Route path ="/transactions">
                        <Transaction />
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

export default Home