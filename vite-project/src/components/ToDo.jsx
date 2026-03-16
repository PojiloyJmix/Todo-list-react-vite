import {useState, useEffect, useRef} from 'react'

import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"
import Button from "./Button"


const ToDo = () => {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')


        if(savedTasks){
            return JSON.parse(savedTasks)
        }

        return [
            { id: 'task-1', title: 'Купить молоко', isDone: false },
            { id: 'task-2', title: 'Открыть окно', isDone: true },
            { id: 'task-3', title: 'Погладить собачку', isDone: false },
        ]
    })

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const newTaskInputRef = useRef(null)
    const firstIncompliteTaskRef = useRef(null)
    const firstIncompliteTaskId = tasks.find(({isDone}) => !isDone)?.id


    const deleteTask = (taskId) => {
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }

    const deletAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want to delet all tasks?')

        if(isConfirmed){
            setTasks([])
        }
    }

    const addTask = () => {
        if(newTaskTitle.trim().length > 0){

            const newTask = {
                id: crypto?.randomUUID?.() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask])
            setNewTaskTitle('')
            setSearchQuery('')

            newTaskInputRef.current.focus()
        }
    }


    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {

                if(task.id === taskId){
                    return {...task, isDone}
                }

                return task
            })
        )
    }


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    }, [])


    const clearSearchQuery = searchQuery.trim().toLocaleLowerCase()
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLocaleLowerCase().includes(clearSearchQuery))
        : null 


    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
                addTask={addTask}
            
            />

            <SearchTaskForm 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}

            />
            
            <ToDoInfo 
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
                inDeliteAllButtonClick={deletAllTasks}

            />

            <Button 
                onClick={() => firstIncompliteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}

            >
                Show first incomplite task
            </Button>

            <ToDoList 
                tasks={tasks} 
                filteredTasks={filteredTasks}
                firstIncompliteTaskId={firstIncompliteTaskId}
                firstIncompliteTaskRef={firstIncompliteTaskRef}
                onDeliteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            
            />
            
        </div>
    )
}

export default ToDo