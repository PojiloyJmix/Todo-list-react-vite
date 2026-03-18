import { 
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo 
} from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'


const useTasks = () => {
    const {
        savedTasks,
        saveTasks

    } = useTasksLocalStorage()

    const [tasks, setTasks] = useState(savedTasks ?? [
            { id: 'task-1', title: 'Купить молоко', isDone: false },
            { id: 'task-2', title: 'Открыть окно', isDone: true },
            { id: 'task-3', title: 'Погладить собачку', isDone: false },
        ])
    

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const newTaskInputRef = useRef(null)


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
        saveTasks(tasks)
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


    return{
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
    }
}

export default useTasks