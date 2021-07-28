import React from "react"

const About = () => {
    return(
        <div className="flex bg-white h-screen">
            <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">The application connects to the Open Banking Project Api to simulate connecting to real banks with Open Banking.</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">This application was created for as the final project for my Msc Computing and Information System course at Queen Mary University of London</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">I can be contacted at phamhungphu97@gmail.com or at ec20104@qmul.ac.uk</p>
                </div>
            </div>
        </div>
    )
}

export default About