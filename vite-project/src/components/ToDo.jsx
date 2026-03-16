import {useState, useEffect} from 'react'

import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"


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
        console.log('задача добавлена')
        if(newTaskTitle.trim().length > 0){

            const newTask = {
                id: crypto?.randomUUID?.() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask])
            setNewTaskTitle('')
            setSearchQuery('')
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

            <ToDoList 
                tasks={tasks} 
                filteredTasks={filteredTasks}
                onDeliteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            
            />
            
        </div>
    )
}

export default ToDo