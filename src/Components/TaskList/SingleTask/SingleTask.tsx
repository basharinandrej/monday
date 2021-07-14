import React from 'react'
import './SingleTask.sass'
import ImportanceLevel from "./Importance/Importance";
import StatusTask from "./Status/Status";
import { useDispatch } from 'react-redux';
import {ActionAPI} from 'src/redux/actions/tasks';

type SingleTaskPropsType = {
    title: string
    id: string
    importanceLevel: number
}

type Task = {
    title: string
    id: string
    importanceLevel?: number
}

const SingleTask = (props: SingleTaskPropsType) => {
    const dispatch = useDispatch()
    const {title, id, importanceLevel} = props
    const [initialTask, setInitialTask] = React.useState<Task>({id: '', title: ''})
    const [updateTask, setUpdateTask] = React.useState<Task>({id: '', title: ''})

    const saveTask = (
        e: React.FocusEvent,
        placeForSave:{(value: React.SetStateAction<Task>): void}) =>
    {
        const target = e.target as HTMLDivElement
        placeForSave({
            id: target.id,
            title: target.innerText
        })
    }

    const onFocusHandler = (e: React.FocusEvent) => saveTask(e, setInitialTask)
    const onBlurHandler = (e: React.FocusEvent) => saveTask(e, setUpdateTask)

    React.useEffect(() => {
        if (initialTask.title !== updateTask.title) {
            dispatch(ActionAPI.editTask(id, {title: updateTask.title}))
        }

    }, [initialTask, updateTask])

    return (
        <li className="single-task">
            <h2 className="single-task__title"
                suppressContentEditableWarning={true}
                contentEditable={true}
                id={id}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
            >
                {title}
            </h2>
            <div className="single-task__box">
                <p className="single-task__paragraph">
                    {id}
                </p>
                <StatusTask
                    idTask={id}
                />
                <ImportanceLevel
                    importanceLevel={importanceLevel}
                    idTask={id}
                />
            </div>
        </li>
    )
}

export default SingleTask
