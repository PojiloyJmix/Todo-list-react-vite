import { useContext } from "react"
import Button from "./Button"
import Field from "./Field"
import { tasksContext } from "../context/taskContext"

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(tasksContext)


  const onSubmit = (event) => {
    event.preventDefault()
    addTask()
  }

    return (
    <form className="todo__form" onSubmit={onSubmit}>
        <Field 
        
          className="todo__field"
          label="New task title"
          id="new-task"
          type="text"
          value={newTaskTitle}
          onInput={(event) => setNewTaskTitle(event.target.value)}
          ref={newTaskInputRef}
        />
        <Button type="submit">Add</Button>
      </form>
    )
}

export default AddTaskForm