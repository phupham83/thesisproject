import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../../reducers/filterReducer"
const TimeFilter = () => {
    const dispatch = useDispatch()
    const timeFilter = useSelector(state => state.timeFilter)
    const changeFilter = (event) => {
        const time = event.target.value
        dispatch(setFilter(time))
    }

    return(
        <select name="time" id="time" onChange ={changeFilter} defaultValue={timeFilter} className="rounded shadow-md h-15 w-30">
            <option value="Today">Today</option>
            <option value="This month">This month</option>
            <option value="This year">This year</option>
            <option value="All">All</option>
        </select>

    )
}

export default TimeFilter
