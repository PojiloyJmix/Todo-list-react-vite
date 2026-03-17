import ToDo from "./components/ToDo"
import { TasksProvider } from "./context/taskContext"

const App = () => {

  return (
    <TasksProvider>
      <ToDo />
    </TasksProvider>
  )
}

export default App
