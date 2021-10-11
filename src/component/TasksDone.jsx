const TasksDone = ({task}) => {
    return (
        <div>
            <p>{task.taskName}</p>
            <input type="checkbox" />
        </div>
    )
}

export default TasksDone