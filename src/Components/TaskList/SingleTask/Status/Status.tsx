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

const StatusTask = (props: statusTaskPropsTypes) => {
    const {idTask} = props
    const [statusTask, setStatusTask] = React.useState<statusTask>()
    const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
    const [color, setColor] = React.useState<string>('')
    const [text, setText] = React.useState<string>('')

    React.useEffect(() => {
        axios
            .get(`http://localhost:3001/tasks?id=${idTask}&_embed=statusTask`)
            .then(resp => {
                setStatusTask(resp.data[0].statusTask[0])
            })
            .catch(err => console.log('errStatusTask', err))
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
            .put(`http://localhost:3001/statusTask/${statusTask!.id}`,
                {text, color, taskId: +idTask}
            )
            .then(resp => console.log('resp_put', resp))
    }

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
                        <span style={{background: 'green'}} className="popup-status__mark-status mark-status">
                        <p className="mark-status__paragraph">Front-end review</p>
                    </span>
                        <span style={{background: 'red'}} className="popup-status__mark-status mark-status">
                        <p className="mark-status__paragraph">Back-end</p>
                    </span>
                        <span style={{background: 'pink'}} className="popup-status__mark-status mark-status">
                        <p className="mark-status__paragraph">HTML-end</p>
                    </span>
                  </div>


                  <hr/>
                  <form className="popup-status__form" onSubmit={onSubmitHandler}>
                      <input type="text" onChange={onChangeTextHandler}/>
                      <input type="color" onChange={onChangeColorHandler}/>
                      <button>Send</button>
                  </form>
              </div>
            )}
        </div>
    )
}

export default StatusTask