const initialState = []

const taskTodoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'READ_TODOLIST':
            return [...action.payload]
        case 'DELETE_ALL':
            return [...action.payload]
        case 'DELETE_DONE':
            const items = state.filter(elt => elt.status !== "done")
            return [...items]
        case 'DELETE_TASK':
            return [...action.payload]
        case 'MODIFY_TASK':
            const item = state.find(elt => elt.id === action.payload)
            
            console.log("new item ", item)
            const newState = [...state]
            const newItem = {...item}
            newItem.status === "done" ? newItem.status = "undone" : newItem.status = "done"
            newState.splice(newState.indexOf(item), 1, {...newItem})
            console.log("new state: ", newState)
            return newState
        case 'MODIFY_VALUE':
            const element = state.find(elt => elt.id === action.payload.id)
            const newElement = {...element}
            const nState = [...state]
            if (newElement.taskName !== ''){
                newElement.taskName = action.payload.newValue
                nState.splice(nState.indexOf(element), 1, {...newElement})
            }
            return nState
        default:
            return state
    }
}

export default taskTodoReducer