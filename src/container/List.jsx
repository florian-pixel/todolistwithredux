import React, {Component as ReactComponent} from 'react'
import { connect } from 'react-redux'
import { taskTodo, createTask, deleteAll, deleteDone } from '../action/todoList'
import TasksDone from '../component/TasksDone'

class List extends ReactComponent {
    constructor(props){
        super(props)

        this.state ={
            listTodo: [],
            newValue: ''
        }
        
        console.log(props.tasksTodo)
    }

    componentDidMount(){
        this.props.taskTodo()                
    }

    componentDidUpdate(prevProps){
        if (this.props.tasksTodo!== prevProps.tasksTodo){
            console.log(this.props.tasksTodo)
            this.setState({listTodo: [...this.props.tasksTodo]})
        }

    }

    handleChange(e){
        console.log(e.target.value)
        return this.setState({newValue: e.target.value})
        
    }

    handleClick(e){
        e.preventDefault()
        this.props.createTask(this.state.newValue)
        console.log(this.props.tasksTodo)
        return this.setState({newValue: ''})
        
    }
    handleClickDone (e){
        e.preventDefault()        
        const doneElement = this.props.tasksTodo.filter((elt) => elt.status ==='done')
        this.setState({listTodo: doneElement})

    }
    handleClickUndone (e){
        e.preventDefault()        
        const undoneElement = this.props.tasksTodo.filter((elt) => elt.status ==='undone')
        this.setState({listTodo: undoneElement})

    }
    handleClickAll (e){
        console.log(this.props.tasksTodo)
        e.preventDefault()                
        this.setState({listTodo: [...this.props.tasksTodo]})
        console.log(this.state.listTodo)
    }
    handleClickDeleteDone (e){
        e.preventDefault()
        this.props.deleteDone()
    }
    handleClickDeleteAll(e){
        e.preventDefault()
        this.props.deleteAll()
    }
    render (){                    
        return (
            <div>
                <div>
                    <h3>TodoInput</h3>
                    <div>
                        <input onChange = {(e) => this.handleChange(e)} className="new-todo" type="text" placeholder="New Todo"/>
                        <button onClick = {(e) => this.handleClick(e)}>Add New Task</button>
                    </div>
                </div>
                <div>
                    <h3>TodoList</h3>
                    <div>
                        <button onClick = {(e) => this.handleClickAll(e)}>All</button>
                        <button onClick = {(e) => this.handleClickDone(e)}>Done</button>
                        <button onClick = {(e) => this.handleClickUndone(e)}>Todo</button>
                    </div>
                    <div>
                        {
                            this.state.listTodo && this.state.listTodo.length > 0  ? this.state.listTodo.map((elt, index) => <TasksDone task = {elt} key = {index}/>) : 'Aucun élément à afficher'                            
                        }
                        
                    </div>
                    <div>
                        <button onClick={(e) => this.handleClickDeleteDone(e)} >Delete done tasks</button>
                        <button onClick={(e) => this.handleClickDeleteAll(e)}>Delete all tasks</button>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownprops) => ({
    tasksTodo: state.tasksTodo
})

const mapDispatchToProps = {
    taskTodo,
    createTask,
    deleteAll,
    deleteDone
}

export default connect (mapStateToProps, mapDispatchToProps)(List)