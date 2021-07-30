import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import userReducer from "./reducers/userReducer"
import messageReducer from "./reducers/messageReducer"
import choiceReducer from "./reducers/choiceReducer"
import signUpReducer from "./reducers/signUpReducer"
import filterReducer from "./reducers/filterReducer"


const combinedReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    choice: choiceReducer,
    signUpEmail: signUpReducer,
    timeFilter: filterReducer
})
const store = createStore(
    combinedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store