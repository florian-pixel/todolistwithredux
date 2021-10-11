const initialState = []

const taskTodoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'READ_TODOLIST':
            return [...action.payload]
        case 'DELETE_ALL':
            return [...action.payload]
        case 'DELETE_DONE':
            return [...action.payload]

        default:
            return state
    }
}

export default taskTodoReducer