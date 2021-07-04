import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import transactionReducer from "./reducers/transactionReducer"
import userReducer from "./reducers/userReducer"



const combinedReducer = combineReducers({
    transactions: transactionReducer,
    user: userReducer
})
const store = createStore(
    combinedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store