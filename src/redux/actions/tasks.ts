import axios from "axios";

export const isLoadingTasks = (status: boolean) => {
    return {
        type: 'SET_IS_LOADING_TASKS',
        payload: status
    }
}
export const setTasks = (payload: Array<object>): object => {
    return {
        type: 'SET_TASKS',
        payload
    }
}

//@ts-ignore
export const setApiTasks = () => (dispatch) => {
    dispatch(isLoadingTasks(true))
    axios
        .get('http://localhost:3001/tasks')
        .then(resp => {
            dispatch(setTasks(resp.data))
            dispatch(isLoadingTasks(false))
        })
        .catch(err => console.log('err_get', err))

}