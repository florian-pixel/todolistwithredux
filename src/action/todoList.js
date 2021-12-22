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
        id: listTask[listTask.length -1].id + 1,
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

export const deleteTask = (eltDelete) => {
    console.log(eltDelete)
    const delTask= listTask.filter((elt) =>  elt.id !== eltDelete.id)
    listTask = [...delTask]
    console.log(listTask)
    return function(dispatch){
        dispatch({
            type: 'DELETE_TASK',
            payload: listTask            
        })
    }
}

export const deleteDone = () => {    
    return function(dispatch){
        dispatch({
            type: 'DELETE_DONE',
            payload: listTask
        })
    }
}

export const modifyTask = (task) => {
    return function (dispatch){
        dispatch({
            type: 'MODIFY_TASK',
            payload: task.id        
        })
    }
}
export const modifyValue = (newElt) => {
    return function (dispatch){
        dispatch({
            type: 'MODIFY_VALUE',
            payload: newElt      
        })
    }
}