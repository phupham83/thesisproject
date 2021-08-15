import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import { checkEmailVerified, reSendEmail } from "../../reducers/signUpReducer"
import { Redirect } from "react-router"
import Message from "../Message"

const SignUpEmailStep = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const signUpEmail = useSelector(state => state.signUpEmail)
    const handleCheckVerified = (event) => {
        event.preventDefault()
        const cb = () => history.push("/signUpSMSstep")
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(checkEmailVerified(cb, messageCb))
    }

    const handleReSendEmail = (event) => {
        event.preventDefault()
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(reSendEmail( messageCb))
    }
    return(
        <div>
            {signUpEmail ?
                <div className ="flex justify-center">
                    <div className ="w-1/2 bg-hero-pattern-login bg-center bg-no-repeat bg-cover"></div>
                    <section className="App h-screen w-full flex justify-center items-center bg-gray-100 ">
                        <div className="w-full max-w-md bg-gray-800">
                            <Message/>
                            <p className = "text-white bold md:text-center pb-4">Step 2. Email Verification</p>
                            <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                                <div className="px-4 pb-4">
                                    <p className = "text-black bold">Please verify your email to continue the sign up process</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <button id ="signup-button" type="button" onClick = {handleCheckVerified} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">I have verified my email</button>
                                </div>
                                <div className="px-4 pb-4">
                                    <button id ="signup-button" type="button" onClick = {handleReSendEmail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">Resend Email</button>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                :
                <Redirect to = "/"/>}
        </div>


    )
}

export default SignUpEmailStep