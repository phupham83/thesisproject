import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import { changeNumber } from "../../reducers/signUpReducer"
import Message from "../Message"

const ChangeNumber = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const messageCb = (message) => {dispatch(setMessage(message))}
    const cb = () => history.push("/signUpSMSstep")
    const handleChangeNumber = (event) => {
        event.preventDefault()
        const number = event.target.Number.value
        dispatch(changeNumber(number, cb, messageCb))
    }
    return(
        <div className ="flex justify-center">
            <div className ="w-1/2 bg-hero-pattern-login bg-center bg-no-repeat bg-cover"></div>
            <section className="App h-screen w-full flex justify-center items-center bg-gray-00 ">
                <div className="w-full max-w-md bg-gray-800">
                    <Message/>
                    <p className = "text-white bold md:text-center pb-4">Change your number</p>
                    <form onSubmit ={handleChangeNumber} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                        <div className="px-4 pb-4">
                            <p className = "text-black bold  ">Please enter your new number here</p>
                            <p className = "text-black bold  ">Make sure it starts with the country code <br/>(e.g +44)</p>
                        </div>
                        <div className="px-4 pb-4">
                            <label htmlFor="text" className="text-sm block font-bold pb-2">Number</label>
                            <input
                                type="text"
                                name="Number"
                                id ="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                            />
                        </div>
                        <button id ="confirm-button" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Confirm</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ChangeNumber