import { createContext } from 'react'
import useTasks from '../hooks/useTasks'
import useIncompliteTaskScroll from '../hooks/useIncompliteTaskScroll'

export const tasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props


    
    const {
        tasks,
        filteredTasks,
        deleteTask,
        deletAllTasks,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    } = useTasks()


    const {
        firstIncompliteTaskRef,
        firstIncompliteTaskId,
    } = useIncompliteTaskScroll(tasks)



    return (
         <tasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompliteTaskRef,
                firstIncompliteTaskId,
                deleteTask,
                deletAllTasks,
                toggleTaskComplete,

                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask
            }}
        
        >
           {children}
        </tasksContext.Provider>
    )
}