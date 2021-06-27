import React from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import NoMatch from "./NoMatch"
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const GuessHome = () =>{
    const padding = {
        padding: 5
      }
    return (
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
    )
}

export default GuessHome