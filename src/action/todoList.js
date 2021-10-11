import axios from "axios";


let listTask = []
export const taskTodo = () => {
    return function(dispatch){
        axios({
            method: 'GET',
            url: 'http://localhost:3004/todoList'
        })
        .then(({data}) => {
            listTask.push(...data)
            dispatch({
                type: 'READ_TODOLIST',
                payload: data
            })
        })
        .catch(err => console.error(err))
       
    }
}

export const createTask = (task) => {
    const newTask = {
        taskName: task,
        status: 'undone'
    }
    listTask.push(newTask)
    return function(dispatch){
        dispatch({
            type: 'READ_TODOLIST',
            payload: listTask
        })
    }
    
}

export const deleteAll = () => {
    listTask.splice(0, listTask.length)
    return function(dispatch){
        dispatch({
            type: 'DELETE_ALL',
            payload: listTask
        })
    }
}

export const deleteDone = () => {
    const taskUndone = listTask.filter(elt => elt.status !== 'done')
    listTask = [...taskUndone]
    return function(dispatch){
        dispatch({
            type: 'DELETE_DONE',
            payload: listTask
        })
    }
}