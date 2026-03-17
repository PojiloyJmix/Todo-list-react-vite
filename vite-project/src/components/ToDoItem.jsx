import { memo, useContext } from "react"

import { tasksContext } from "../context/taskContext"

const ToDoItem = (props) => {
    const {
        className = '',
        id,
        title,
        isDone,
    } = props

    const {
        firstIncompliteTaskRef,
        firstIncompliteTaskId,
        deleteTask,
        toggleTaskComplete
    } = useContext(tasksContext)


    return (
        <li 
          className={`todo_item ${className}`} 
          ref={id === firstIncompliteTaskId ? firstIncompliteTaskRef : null}
          
          
          >
          <input
            className="todo-item__checkbox"
            id={id}
            type="checkbox"
            checked={isDone}
            onChange={(event) => toggleTaskComplete(id, event.target.checked)}
          />
          <label
            className="todo-item__label"
            htmlFor={id}
          >
            {title}
          </label>
          <button
            className="todo-item__delete-button"
            aria-label="Delete"
            title="Delete"
            onClick={() => deleteTask(id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
    )
}

export default memo(ToDoItem)