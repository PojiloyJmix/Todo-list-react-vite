import { useRef } from "react"

const useIncompliteTaskScroll = (tasks) => {

    const firstIncompliteTaskRef = useRef(null)
    const firstIncompliteTaskId = tasks.find(({isDone}) => !isDone)?.id


    return {
        firstIncompliteTaskRef,
        firstIncompliteTaskId
    }
}



export default useIncompliteTaskScroll