import { useContext } from 'react'

import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"
import Button from "./Button"

import { tasksContext } from '../context/taskContext'



const ToDo = () => {

    const { firstIncompliteTaskRef } = useContext(tasksContext)
   


    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />

            <SearchTaskForm />
            
            <ToDoInfo />

            <Button 
                onClick={() => firstIncompliteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}

            >
                Show first incomplite task
            </Button>

            <ToDoList />
            
        </div>
    )
}

export default ToDo