const budgetChoicesReducer = (state = { bills: 0, foodDrink: 0, transport: 0, groceries: 0, generalExpense: 0 }, action) => {
    switch(action.type){
    case"SET_BUDGET_CHOICE_BILLS":
        return { ...state, bills: action.data }
    case"SET_BUDGET_CHOICE_FOOD_AND_DRINK":
        return { ...state, foodDrink: action.data }
    case"SET_BUDGET_CHOICE_TRANSPORT":
        return { ...state, transport: action.data }
    case"SET_BUDGET_CHOICE_GROCERIES":
        return { ...state, groceries: action.data }
    case"SET_BUDGET_CHOICE_GENERAL_EXPENSE":
        return { ...state, generalExpense: action.data }
    default:
        return state
    }
}

export const setBudgetChoice = (choice) => {
    return dispatch => {
        if(choice.name === "Bills"){
            dispatch({
                type: "SET_BUDGET_CHOICE_BILLS",
                data: parseFloat(choice.amount)
            })
        }else if(choice.name === "FoodandDrink"){
            dispatch({
                type: "SET_BUDGET_CHOICE_FOOD_AND_DRINK",
                data: parseFloat(choice.amount)
            })
        }else if(choice.name === "Transport"){
            dispatch({
                type: "SET_BUDGET_CHOICE_TRANSPORT",
                data: parseFloat(choice.amount)
            })
        }else if(choice.name === "Groceries"){
            dispatch({
                type: "SET_BUDGET_CHOICE_GROCERIES",
                data: parseFloat(choice.amount)
            })
        }else if(choice.name === "GeneralExpense"){
            dispatch({
                type: "SET_BUDGET_CHOICE_GENERAL_EXPENSE",
                data: parseFloat(choice.amount)
            })
        }
    }
}

export default budgetChoicesReducer