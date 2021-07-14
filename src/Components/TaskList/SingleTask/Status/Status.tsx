import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Status.sass'
import {ActionAPI} from 'src/redux/actions/tasks'
import ClickOutside from 'src/hooks/useOutsideClick'

type statusTaskPropsTypes = {
    idTask: string
}

type statusTask = {
    "id": number,
    "taskId": number,
    "text": string,
    "color": string
}

type statusType = {
    "id": number,
    "text": string,
    "color": string
}

type RootState = {
    tasks: {
        isLoadingTasks: boolean,
        isLoadingStatusSingeTask: boolean,
        items: Array<object>,
        statusTask: []
    }
}
const StatusTask = (props: statusTaskPropsTypes) => {
    const {idTask} = props
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const popupRef = React.useRef<HTMLDivElement>(null)


    const [statusTask, setStatusTask] = React.useState<statusTask>()
    const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
    const [color, setColor] = React.useState<string>('#ff0000')
    const [text, setText] = React.useState<string>('')
    const [allStatus, setAllStatus] = React.useState<statusType[]>()
    const [activeStatus, setActiveStatus] = React.useState<number>(0)

    // @ts-ignore
    ClickOutside(popupRef, setIsOpenPopup)

    React.useEffect(() => {
        dispatch(ActionAPI.getStatusSingleTask(idTask))
    }, [])

    React.useEffect(() => {
        isOpenPopup && axios.get('http://localhost:3001/allStatus')
            .then(resp => {
                setAllStatus(resp.data)
            })
            .catch(err => console.log('errStatus', err))
    }, [isOpenPopup])

    React.useEffect(() => {
        const statusTask = state.tasks.statusTask.filter((el: statusTask) => el.taskId === +idTask)[0]
        setStatusTask(statusTask)
    }, [state])

    const onChangeTextHandler = (e: React.ChangeEvent) => {
        const target = e.target
        // @ts-ignore
        setText(e.target.value)
    }
    const onChangeColorHandler = (e: React.ChangeEvent) => {
        const target = e.target
        // @ts-ignore
        setColor(e.target.value)
    }

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(ActionAPI.addNewStatus({text, color, taskId: +idTask}))
        // @ts-ignore
        setAllStatus([...allStatus, {
            text, color,
            taskId: +idTask,
            // @ts-ignore
            id: allStatus[allStatus?.length - 1].id + 1
        }])
    }

    const onClickStatusHandler = (e: React.MouseEvent) => {
        // @ts-ignore
        const idStatus = +e.target.id
        const newStatus = allStatus?.filter(el => el.id === idStatus)[0]

        setActiveStatus(idStatus);
        // @ts-ignore
        setStatusTask(newStatus)
        axios
            .patch(`http://localhost:3001/statusTask/${idTask}`,
                // @ts-ignore
                {text: newStatus.text, color: newStatus.color,
                    taskId: +idTask
                }
            )
            .then(resp => {
                setStatusTask(resp.data)
                console.log('resp_put1', resp)
            })
            .catch(resp => console.log('catch_put', resp))
    }

    const onDeleteHandler = (id: string) => {
        // @ts-ignore
        setAllStatus(allStatus.filter(el => el.id !== +id))
        dispatch(ActionAPI.deleteStatus(id))
    }

    return (
        <div className="status-mark">
            {!state.tasks.isLoadingStatusSingeTask ? 
            (<p  style={{background: statusTask?.color}}
                className="status-mark__paragraph"
                onClick={() => setIsOpenPopup(!isOpenPopup)}
            >
                {statusTask && statusTask.text}
            </p>) : 'Загрузка ....'}
            {isOpenPopup && (
                <div className="status-mark__popup-status popup-status" ref={popupRef}>
                    <div className="popup-status__wrapper">
                        {allStatus?.map((status, idx) => {
                            const id = status.id?.toString()
                            return (
                                <span key={status.id + idx}
                                      style={{background: `${status.color}`}}
                                      // @ts-ignore
                                      className={`popup-status__mark-status mark-status 
                                                ${(+activeStatus === +id) ? 'mark-status--active' : ''}`}>
                                    <span onClick={() => onDeleteHandler(id)} className="mark-status__close">&times;</span>
                                    <p
                                        id={id}
                                        onClick={onClickStatusHandler}
                                        className="mark-status__paragraph">
                                        {status.text}
                                    </p>
                                </span>
                            )
                        })}
                  </div>

                  <hr/>
                  <form className="popup-status__form" onSubmit={onSubmitHandler}>
                      <input type="text" onChange={onChangeTextHandler}/>
                      <input type="color" value={color} onChange={onChangeColorHandler}/>
                      <button>Send</button>
                  </form>
              </div>
            )}
        </div>
    )
}

export default StatusTask