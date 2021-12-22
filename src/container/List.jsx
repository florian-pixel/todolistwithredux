import React, {Component as ReactComponent} from 'react'
import { connect } from 'react-redux'
import { taskTodo, createTask, deleteAll, deleteDone, deleteTask, modifyTask, modifyValue } from '../action/todoList'
import TasksDone from '../component/TasksDone'

class List extends ReactComponent {
    constructor(props){
        super(props)

        this.state ={
            listTodo: [],
            newValue: '',
            modifyValue:''
        }
        
    }

    componentDidMount(){
        this.props.taskTodo()                
    }

    componentDidUpdate(prevProps){
        if (this.props.tasksTodo !== prevProps.tasksTodo){
            console.log(this.props.tasksTodo)
            this.setState({listTodo: [...this.props.tasksTodo]})
        }

    }

    handleChangeTask(e){
        e.preventDefault()
        console.log(e.target.value)
        return this.setState({modifyValue: e.target.value})
    }

    handleChange(e){
        console.log(e.target.value)
        return this.setState({newValue: e.target.value})
        
    }

    handleClick(e){ //add a new task
        e.preventDefault()
        this.props.createTask(this.state.newValue)
        this.setState({newValue: ''})
        return e.target.value = ''
        
    }
    handleClickDone (e){ //dsiplay tasks done
        e.preventDefault()        
        const doneElement = this.props.tasksTodo.filter((elt) => elt.status ==='done')
        this.setState({listTodo: doneElement})

    }
    handleClickUndone (e){ //display tasks undone
        e.preventDefault()        
        const undoneElement = this.props.tasksTodo.filter((elt) => elt.status ==='undone')
        this.setState({listTodo: undoneElement})

    }
    handleClickAll (e){ //dsiplay all tasks
        console.log(this.props.tasksTodo)
        e.preventDefault()                
        this.setState({listTodo: [...this.props.tasksTodo]})
        console.log(this.state.listTodo)
    }
    handleClickDeleteDone (e){ //delete tasks done
        e.preventDefault()
        this.props.deleteDone()
    }
    handleClickDeleteAll(e){ //delete all tasks
        e.preventDefault()
        this.props.deleteAll()
    }

    handleClickModifTask(e, id){ //modify Tasks
        e.preventDefault()
        console.log("newValue: ", this.recupNewTask())
        this.props.modifyValue({id: id, newValue: this.state.modifyValue})
        this.setState({modifyValue: ''})
        console.log('modifvalue: ', this.recupNewTask())
        return e.target.value = ''
    }

    recupNewTask(){
        return this.state.modifyValue
    }

    render (){                    
        return (
            <div id="main">
                <div>
                    <h3>TodoInput</h3>
                    <div>
                        <input value = {this.state.newValue} onChange = {(e) => this.handleChange(e)} className="new-todo" type="text" placeholder="New Todo"/>
                        <br/>
                        <button className="btn-Add" onClick = {(e) => this.handleClick(e)}>Add New Task</button>
                    </div>
                </div>
                <div>
                    <h3>TodoList</h3>
                    <div>
                        <button onClick = {(e) => this.handleClickAll(e)}>All</button>
                        <button onClick = {(e) => this.handleClickDone(e)}>Done</button>
                        <button onClick = {(e) => this.handleClickUndone(e)}>Todo</button>
                    </div>
                    <input value = {this.state.modifyValue}type="text" placeholder='Modifier une tâche' onChange={e => this.handleChangeTask(e)}></input>
                    <div>
                        {
                            this.state.listTodo && this.state.listTodo.length > 0  ? this.state.listTodo.map((elt, index) => <TasksDone task = {elt} key = {index} delElt = {(elt) => this.props.deleteTask(elt)} modifElt = {(id) => this.props.modifyTask(id)} modifTask = {(e, id) => this.handleClickModifTask(e, id)} />) : 'Aucun élément à afficher'                            
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
    deleteDone,
    deleteTask,
    modifyTask,
    modifyValue
}

export default connect (mapStateToProps, mapDispatchToProps)(List)