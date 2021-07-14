import axios from "axios";
import { baseUrl } from "src/core/baseUrl";

type statusTask = {
    "id": number,
    "taskId": number,
    "text": string,
    "color": string
}

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
    }, 
    setStatusSingleTask: (payload: statusTask): object => {
        return {
            type: 'SET_STATUS_SINGLE_TASK', 
            payload
        }
    }, 
    isLoadingStatusSingelTask: (status: boolean) => {
        return {
            type: 'IS_LOADING_STATUS_SINGLE_TASK', 
            payload: status
        }
    }
}

export const ActionAPI = {
    getTasks: () => (dispatch: (arg0: object) => void) => {
        dispatch(Action.isLoadingTasks(true))
        axios
            .get(`${baseUrl}/tasks`)
            .then(resp => {
                dispatch(Action.setTasks(resp.data))
                dispatch(Action.isLoadingTasks(false))
            })
            .catch(err => console.log('err_get', err))
    },
    editTask: (id: string, newTask: object) => (dispatch: (arg0: object) => void) => {
        axios
            .patch(`${baseUrl}/tasks/${id}`, newTask)
            .then(resp => {console.log('resp', resp)})
            .catch(err => console.log('err_patch', err))
    },
    getStatusSingleTask: (idTask: string) => (dispatch: (arg0: object) => void) => {
        dispatch(Action.isLoadingStatusSingelTask(true))
        axios
            .get(`${baseUrl}/statusTask?taskId=${idTask}`)
            .then(resp => {
                dispatch(Action.setStatusSingleTask([...resp.data][0]))
                dispatch(Action.isLoadingStatusSingelTask(false))
            })
            .catch(err => console.log('errStatusTask', err))
    },
    addNewStatus: (newStatus: object) => (dispatch: (arg0: object) => void) => {
        axios
            .post(`http://localhost:3001/allStatus`, newStatus)
            .then(resp => {console.log('respAllStatus', resp)})
    },
    deleteStatus: (id: string) => (dispatch: (arg0: object) => void) => {
        axios
            .delete(`http://localhost:3001/allStatus/${id}`)
            .then(resp => console.log('resp_put', resp))
            .catch(resp => console.log('catch_put', resp))
    }
}
