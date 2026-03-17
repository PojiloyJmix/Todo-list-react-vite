import { memo, useContext } from 'react'

import { tasksContext } from "../context/taskContext"

import ToDoItem from "./ToDoItem"


const ToDoList = () => {

    const {
        tasks,
        filteredTasks,
    } = useContext(tasksContext)

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
            {...task}

          />
        ))}
      </ul>
    )
}

export default memo(ToDoList)