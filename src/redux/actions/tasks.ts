import axios from "axios";

export const Action = {
    isLoadingTasks: (status: boolean) => {
        return {
            type: 'SET_IS_LOADING_TASKS',
            payload: status
        }
    },
    setTasks: (payload: Array<object>): object => {
        return {
            type: 'SET_TASKS',
            payload
        }
    }
}

export const ActionAPI = {
    setApiTasks: () => (dispatch: (arg0: object) => void) => {
        dispatch(Action.isLoadingTasks(true))
        axios
            .get('http://localhost:3001/tasks')
            .then(resp => {
                dispatch(Action.setTasks(resp.data))
                dispatch(Action.isLoadingTasks(false))
            })
            .catch(err => console.log('err_get', err))
    }
}
