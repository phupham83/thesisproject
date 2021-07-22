import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import userReducer from "./reducers/userReducer"
import messageReducer from "./reducers/messageReducer"
import choiceReducer from "./reducers/choiceReducer"



const combinedReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    choice: choiceReducer
})
const store = createStore(
    combinedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store