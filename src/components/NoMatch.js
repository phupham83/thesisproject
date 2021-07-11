import React from "react"
import Button from "./utils/Button"
import { Link } from "react-router-dom"

const NoMatch = () => {
    return(
        <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-5xl font-dark font-bold">404</div>
                    <h2>Sorry we couldn`t find this page. </h2>
                    <p>But dont worry, you can find plenty of other things on our homepage.</p>
                    <Link to ="/"><Button text = "Back to homepage"/></Link>
                </div>
            </div>
        </div>
    )
}

export default NoMatch