import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import { checkEmailVerified } from "../../reducers/signUpReducer"
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
        dispatch(checkEmailVerified(signUpEmail, cb, messageCb))
    }
    return(
        <div>
            {signUpEmail ?
                <section className="App h-screen w-full flex justify-center items-center bg-gray-700 ">
                    <div className="w-full max-w-md bg-gray-800">
                        <Message/>
                        <p className = "text-white bold md:text-center pb-4">Step 2. Email Verification</p>
                        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                            <p className = "text-black bold ">Please verify your email to continue the sign up process</p>
                            <div className="px-4 pb-4">
                                <button id ="signup-button" type="button" onClick = {handleCheckVerified} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">I have verified my email</button>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <Redirect to = "/"/>}
        </div>


    )
}

export default SignUpEmailStep