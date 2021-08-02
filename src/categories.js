const setCategories = (allTransactions, timeFilter) => {
    const sumReducer = (initial,nextValue) => {
        return initial + parseFloat(nextValue)
    }
    const filterTransactions = (transactions, time) => {
        const dateNow = new Date()
        const oneJan = new Date(dateNow.getFullYear(),0,1)
        const numberOfDays = Math.floor((dateNow - oneJan) / (24 * 60 * 60 * 1000))
        const weekNow = Math.ceil(( dateNow.getDay() + 1 + numberOfDays) / 7)

        if(time === "Today"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth() && date.getDate() === dateNow.getDate()
                )
            }))
        }else if(time === "This month"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === dateNow.getFullYear() && date.getMonth() === dateNow.getMonth()
                )
            }))
        }else if(time === "Last month"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === dateNow.getFullYear() && date.getMonth() === (dateNow.getMonth() - 1)
                )
            }))
        }else if(time === "This week"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                let weekThen
                if(date.getFullYear() === dateNow.getFullYear()){
                    const oneJan = new Date(date.getFullYear(),0,1)
                    const numberOfDays = Math.floor((date- oneJan) / (24 * 60 * 60 * 1000))
                    weekThen = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7)
                    return(weekNow === weekThen)
                }
            }))
        }else if(time === "Last week"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                let weekThen
                if(date.getFullYear() === dateNow.getFullYear()){
                    const oneJan = new Date(date.getFullYear(),0,1)
                    const numberOfDays = Math.floor((date- oneJan) / (24 * 60 * 60 * 1000))
                    weekThen = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7)
                    return(weekNow === weekThen -1)
                }
            }))
        }else if(time === "This year"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === dateNow.getFullYear()
                )
            }))
        }else if(time === "Last year"){
            return(transactions.filter(transaction => {
                const date = new Date(transaction.details.completed)
                return(
                    date.getFullYear() === (dateNow.getFullYear() -1)
                )
            }))
        }else if(time === "All"){
            return transactions
        }
    }
    const filteredTransactions = filterTransactions(allTransactions, timeFilter)

    const allExpensesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => parseFloat(transaction.details.value.amount) < 0)
        : null
    const allExpensesBillsArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Bills")
        : null
    const allExpensesGroceriesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Groceries")
        : null
    const allExpensesFoodDrinkArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Food & Drink")
        : null
    const allExpensesTransportArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Transport")
        : null

    const allExpensesBills = allExpensesBillsArrays ? allExpensesBillsArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesGroceries = allExpensesGroceriesArrays ? allExpensesGroceriesArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesFoodDrink = allExpensesFoodDrinkArrays ? allExpensesFoodDrinkArrays.map(expense => expense.details.value.amount) : 0
    const allExpensesTransport = allExpensesTransportArrays ? allExpensesTransportArrays.map(expense => expense.details.value.amount) : 0
    const allExpenses = allExpensesArrays ? allExpensesArrays.map(expense => expense.details.value.amount) : []

    const totalExpenses = allExpenses ? allExpenses.reduce(sumReducer,0): 0
    const totalExpensesBills = allExpensesBills ? allExpensesBills.reduce(sumReducer,0): 0
    const totalExpensesGroceries = allExpensesGroceries ? allExpensesGroceries.reduce(sumReducer,0): 0
    const totalExpensesFoodDrink = allExpensesFoodDrink ? allExpensesFoodDrink.reduce(sumReducer,0): 0
    const totalExpensesTransport = allExpensesTransport ? allExpensesTransport.reduce(sumReducer,0): 0
    const generalExpenses = totalExpenses  - totalExpensesBills - totalExpensesGroceries - totalExpensesFoodDrink - totalExpensesTransport

    const allIncomesArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => parseFloat(transaction.details.value.amount) > 0)
        : null
    const allIncomesIncomeArrays = filteredTransactions ?
        filteredTransactions.filter(transaction => transaction.details.description === "Income")
        : null

    const allIncomes = allIncomesArrays ? allIncomesArrays.map(income => income.details.value.amount) : []
    const allIncomesIncome = allIncomesIncomeArrays ? allIncomesIncomeArrays.map(income => income.details.value.amount) : 0
    const totalIncomesIncome = allIncomesIncome ? allIncomesIncome.reduce(sumReducer,0) : 0
    const totalIncomes = allIncomes ? allIncomes.reduce(sumReducer,0) : 0
    const generalIncomes = totalIncomes - totalIncomesIncome
    return ({
        bills:  totalExpensesBills,
        foodDrink: totalExpensesFoodDrink,
        transport: totalExpensesTransport,
        groceries: totalExpensesGroceries,
        generalExpense: generalExpenses,
        totalExpenses: totalExpenses,
        income: totalIncomesIncome,
        generalIncome: generalIncomes,
        totalIncomes: totalIncomes,
        filteredLength: filteredTransactions.length
    })
}


export default setCategories