import React, { useEffect } from "react"
import {  useDispatch, useSelector } from "react-redux"
import NoMatch from "./components/NoMatch"
import Transaction from "./components/Transaction"
import Login from "./components/users/Login"
import Logout from "./components/users/Logout"
import SignUp from "./components/users/SignUp"
import Consent from "./components/consents/Consent"
import Accounts from "./components/Accounts"
import About from "./components/About"
import Message from "./components/Message"
import Home from "./components/Home"
import UnprotectedHome from "./components/UnprotectedHome"
import Choose from "./components/consents/Choose"
import Verified from "./components/users/Verified"
import SignUpSMSstep from "./components/users/SignUpSMSstep"
import SignUpEmailStep from "./components/users/SignUpEmailStep"
import ChangeNumber from "./components/users/ChangeNumber"
import { localLogin  } from "./reducers/userReducer"


import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(localLogin())
    }, [dispatch])
    const user = useSelector(state => state.user)
    const btnStyle = "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white hover:shadow-lg "
    const navStyle = "flex items-center bg-gray-800 p-3 flex-wrap"
    return (
        <div className="App">
            {user === null ?
                <Router>
                    <Switch>
                        <Route path ="/login">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/signup"><span className={btnStyle}>Sign up</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <Login />
                        </Route>
                        <Route path ="/signup">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <SignUp />
                        </Route>
                        <Route path ="/about">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/signup"><span className={btnStyle}>Sign up</span></Link>
                            </nav>
                            <About />
                        </Route>
                        <Route path ="/verified">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <Verified />
                        </Route>
                        <Route exact path ="/">
                            <nav className = {navStyle}>
                                <Link to="/login"><span className={btnStyle}>Login</span></Link>
                                <Link to="/signup"><span className={btnStyle}>Sign up</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <Message />
                            <UnprotectedHome />
                        </Route>
                        <Route path = "/signUpEmailStep">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <SignUpEmailStep />
                        </Route>
                        <Route path = "/signUpSMSstep">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <SignUpSMSstep />
                        </Route>
                        <Route path = "/changeNumber">
                            <nav className = {navStyle}>
                                <Link to="/"><span className={btnStyle}>Home</span></Link>
                                <Link to="/login"><span className={btnStyle}>Log in</span></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <ChangeNumber />
                        </Route>
                        <Route path = "*">
                            <nav className = {navStyle}>
                                <Link to="/"><div className={btnStyle}>Home</div></Link>
                                <Link to="/about"><span className={btnStyle}>About</span></Link>
                            </nav>
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
                :
                <Router>
                    <nav className = {navStyle}>
                        <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
                        <span className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center">{user.name}</span>
                        <Link to="/transactions"><span className={btnStyle}>Transactions</span></Link>
                        <Link to="/accounts"><span className={btnStyle}>Accounts</span></Link>
                        <Link to="/"><span className={btnStyle}>Home</span></Link>
                        <Link to="/about"><span className={btnStyle}>About</span></Link>
                        <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
                        <span className={btnStyle}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <Logout />
                        </span>
                    </nav>
                    <Switch>
                        <Route path ="/transactions">
                            <Transaction />
                        </Route>
                        <Route path = "/accounts">
                            <Accounts />
                        </Route>
                        <Route path = "/about">
                            <About />
                        </Route>
                        <Route path = "/consent">
                            <Consent/>
                        </Route>
                        <Route path = "/choose">
                            <Choose/>
                        </Route>
                        <Route exact path ="/">
                            <Home />
                        </Route>
                        <Route path ="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
            }
        </div>

    )
}

export default App
