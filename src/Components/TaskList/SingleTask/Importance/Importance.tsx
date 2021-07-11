import axios from 'axios';
import React from 'react'
import {ReactSVG} from "react-svg";
import StarImg from "../../../../img/star.svg";
import './Importance.sass'

type importanceProps = {
    importanceLevel: number
    idTask: string
}

const ImportanceLevel = (props: importanceProps) => {
    const { importanceLevel, idTask } = props
    const [localImportanceLevel, setLocalImportanceLevel] = React.useState<number>(importanceLevel)

    const onClickHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement
        const star = target.closest("[data-js='star']")
        const id = star?.id || 0
        star && setLocalImportanceLevel(+id)

        // TODO Дёргать ручку только если важность изменилась
        axios
            .patch(`http://localhost:3001/tasks/${idTask}`,
                {importanceLevel: id}
            )
            .then(resp => {
                console.log(resp);
            })
            .catch(err => console.log('err_patch_star', err))

    }

    const renderStars = () => {
        const stars = []
        const TOTAL_STARS = 5
        for(let i = 0; i<TOTAL_STARS; i++) {
            stars.push(
                <ReactSVG
                    id={(i+1).toString()}
                    src={StarImg}
                    key={i}
                    className={`single-task__star-icon star-icon ${i<+localImportanceLevel ? 'active' : ''}`}
                    data-js="star"
            />)
        }
        return stars
    }

    return (
        <div className="single-task__stars-box" onClick={onClickHandler}>
            {renderStars()}
            <p onClick={() => setLocalImportanceLevel(0)}>cancel</p>
        </div>
    )

}

export default ImportanceLevel
