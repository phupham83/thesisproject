import React from "react"
import { useHistory } from "react-router"

const Verified = () => {
    const history = useHistory()
    const handleRedirect = (event) => {
        event.preventDefault()
        history.push("/login")
    }
    return(
        <section className="App h-screen w-full flex justify-center items-center bg-gray-700 ">
            <div className="w-full max-w-md bg-gray-800">
                <p className = "text-white bold md:text-center pb-4">Step 4. Success</p>
                <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <div className="px-4 pb-4">
                        <p className = "text-black bold ">Your account has been verified please log in to continue</p>
                    </div>
                    <div className="px-4 pb-4">
                        <button id ="signup-button" type="button" onClick = {handleRedirect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">Login</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Verified