import React from 'react'
import SingleTask from "./SingleTask/SingleTask";
import './TaskList.sass'
import {ActionAPI} from 'src/redux/actions/tasks';
import { useDispatch, useSelector } from 'react-redux';

interface TaskInterface {
    id: number,
    title: string,
    importanceLevel: number
}

interface RootState {
    tasks: {
        items: Array<TaskInterface>,
        isLoadingTasks: boolean
    }
}

const TaskList = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)

    const [tasks, setTasks] = React.useState<TaskInterface[]>()

    React.useEffect(() => {
        dispatch(ActionAPI.setApiTasks())
    }, [])

    React.useEffect(() => {
        setTasks(state.tasks.items)
    }, [state])

    return !state.tasks.isLoadingTasks ? (
        <ul className="task-list">
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
            {tasks?.map((task) => {
                return <SingleTask
                    key={task.id}
                    title={task.title}
                    id={task.id.toString()}
                    importanceLevel={task.importanceLevel}
                />
            })}
        </ul>
    ) : (
        <p>Загрузка .....</p>
    )
}

export default TaskList
