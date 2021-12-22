import supp from '../img/supprimer.png'
import modif from '../img/modifier.png'


const TasksDone = ({task, delElt, modifElt, modifTask}) => {
    return (
        <div className= "task">
            <p>{task.taskName}</p>
            <div className="btn-action">
                <input type="checkbox" onClick ={() => modifElt(task) }/>
                <img className="btn-modif" alt="" src={modif} onClick={(e) => modifTask(e, task.id)} ></img>
                <img className="btn-supp" alt="" src={supp} onClick={() => delElt(task)}></img>
            </div>
        </div>
    )
}

export default TasksDone