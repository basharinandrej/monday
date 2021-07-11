import React from 'react'
import SingleTask from "./SingleTask/SingleTask";
import './TaskList.sass'
import { setApiTasks } from 'src/redux/actions/tasks';
import { useDispatch, useSelector } from 'react-redux';

interface TaskInterface {
    id: number,
    title: string,
    importanceLevel: number
}

interface RootState {
    tasks: [{
        id: number,
        title: string,
        importanceLevel: number
    }]
}

const TaskList = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const [tasks, setTasks] = React.useState(state.tasks)
    console.log('state', state.isLoadingTasks)

    React.useEffect(() => {
        dispatch(setApiTasks())
    }, [])

    // @ts-ignore
    return state.tasks && 'as'
}

export default TaskList


{/* <ul className="task-list">
            <li className="task-list__head-list head-list">
                <p className="head-list__paragraph">
                    ID элемента
                </p>
                <p className="head-list__paragraph">
                    Статус
                </p>
                <p className="head-list__paragraph">
                    Сложность
                </p>
            </li>
            {tasks.map((task) => {
                return <SingleTask
                    key={task.id}
                    title={task.title}
                    id={task.id.toString()}
                    importanceLevel={task.importanceLevel}
                />
            })}
        </ul> */}