import { useContext } from "react"
import Field from "./Field"
import { tasksContext } from "../context/taskContext"

const SearchTaskForm = () => {

    const {
        searchQuery,
        setSearchQuery,

    } = useContext(tasksContext)
    


    return (
        <form 
            className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        
        >
           <Field 
           
            className="todo__field"
            label="Search task"
            id="search-task"
            type="search"
            value={searchQuery}
            onInput={(event) => setSearchQuery(event.target.value)}

           />
        </form>
    )
}

export default SearchTaskForm