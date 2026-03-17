import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const tasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props


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