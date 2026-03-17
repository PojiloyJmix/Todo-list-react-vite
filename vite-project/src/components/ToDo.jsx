import {useState, useEffect, useRef, useCallback, useMemo} from 'react'

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


    const deleteTask = useCallback((taskId) => {
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }, [tasks])

    const deletAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure you want to delet all tasks?')

        if(isConfirmed){
            setTasks([])
        }
    }, [])

    const addTask = useCallback(() => {
        if(newTaskTitle.trim().length > 0){

            const newTask = {
                id: crypto?.randomUUID?.() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskTitle('')
            setSearchQuery('')

            newTaskInputRef.current.focus()
        }
    }, [newTaskTitle])


    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map((task) => {

                if(task.id === taskId){
                    return {...task, isDone}
                }

                return task
            })
        )
    }, [tasks])


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    }, [])


    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLocaleLowerCase()
       
        return  clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLocaleLowerCase().includes(clearSearchQuery))
        : null 
    }, [searchQuery, tasks])


    const doneTasks = useMemo(() => {
        return tasks.filter(({isDone}) => isDone).length
    }, [tasks])

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
                done={doneTasks}
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
                firstIncompliteTaskRef={firstIncompliteTaskRef}
                firstIncompliteTaskId={firstIncompliteTaskId}
                onDeliteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            
            />
            
        </div>
    )
}

export default ToDo