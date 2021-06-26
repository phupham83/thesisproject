import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import transactionReducer from './reducers/transactionReducer'
import  loginReducer  from './reducers/loginReducer'



const combinedReducer = combineReducers({
  transactions: transactionReducer,
  user: loginReducer
})
const store = createStore(
    combinedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

export default store