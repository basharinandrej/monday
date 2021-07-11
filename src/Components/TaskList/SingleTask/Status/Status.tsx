import axios from 'axios'
import React from 'react'
import './Status.sass'

type statusTaskPropsTypes = {
    idTask: string | number
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

const StatusTask = (props: statusTaskPropsTypes) => {
    const {idTask} = props

    const [statusTask, setStatusTask] = React.useState<statusTask>()
    const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
    const [color, setColor] = React.useState<string>('#ff0000')
    const [text, setText] = React.useState<string>('')
    const [allStatus, setAllStatus] = React.useState<statusType[]>()
    const [activeStatus, setActiveStatus] = React.useState<number>(0)

    React.useEffect(() => {
        axios
            .get(`http://localhost:3001/statusTask?taskId=${idTask}`)
            .then(resp => {
                setStatusTask(resp.data[0])
            })
            .catch(err => console.log('errStatusTask', err))

        axios.get('http://localhost:3001/allStatus')
            .then(resp => {
                setAllStatus(resp.data)
            })
            .catch(err => console.log('errStatus', err))
    }, [isOpenPopup])

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

        axios
            .post(`http://localhost:3001/allStatus`,
                {text, color, taskId: +idTask}
            )
            .then(resp => {
                // @ts-ignore
                setAllStatus([...allStatus, {
                    text, color,
                    taskId: +idTask,
                    // @ts-ignore
                    id: allStatus[allStatus?.length - 1].id + 1
                }])
            })
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
            .then(resp => console.log('resp_put', resp))
            .catch(resp => console.log('catch_put', resp))
    }

    const onDeleteHandler = (id: string | undefined) => {
        // @ts-ignore
        setAllStatus(allStatus.filter(el => el.id !== +id))
        axios
            .delete(`http://localhost:3001/allStatus/${id}`)
            .then(resp => console.log('resp_put', resp))
            .catch(resp => console.log('catch_put', resp))
    }

    console.log('allStatus', allStatus);
    return (
        <div className="status-mark">
            <p  style={{background: statusTask?.color}}
                className="status-mark__paragraph"
                onClick={() => setIsOpenPopup(!isOpenPopup)}
            >
                {statusTask && statusTask.text}
            </p>
            {isOpenPopup && (
                <div className="status-mark__popup-status popup-status">
                    <div className="popup-status__wrapper">
                        {allStatus?.map((status, idx) => {
                            const id = status.id?.toString()
                            return (
                                <span key={status.id + idx}
                                      style={{background: `${status.color}`}}
                                      // @ts-ignore
                                      className={`popup-status__mark-status mark-status ${(+activeStatus === +id) ? 'mark-status--active' : ''}`}>
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