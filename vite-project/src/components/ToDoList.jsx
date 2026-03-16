import ToDoItem from "./ToDoItem"


const ToDoList = (props) => {

    const {
      tasks = [],
      filteredTasks,
      onDeliteTaskButtonClick,
      onTaskCompleteChange,
    } = props

    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0
  
    
    if(!hasTasks){
        return (<div className="todo__empty-message">There are no tasts yet</div>)
    }

    if(hasTasks && isEmptyFilteredTasks){
       return (<div className="todo__empty-message">Tasks not found</div>)
    }

    return (
        <ul className="todo__list">
   
        {(filteredTasks ?? tasks).map((task) => (
          <ToDoItem 
            className="todo-item"

            key={task.id}
            onDeliteTaskButtonClick={onDeliteTaskButtonClick}
            onTaskCompleteChange={onTaskCompleteChange}

            {...task}

          />
        ))}
      </ul>
    )
}

export default ToDoList