type statusTask = {
    "id": number,
    "taskId": number,
    "text": string,
    "color": string
}
const initialState = {
    isLoadingTasks: false,
    isLoadingStatusSingeTask: false,
    items: [],
    statusTask: []
}
export const tasksReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_IS_LOADING_TASKS':
            return {...state, isLoadingTasks: action.payload}

        case 'SET_TASKS':
            return {...state, items: action.payload}

        case 'IS_LOADING_STATUS_SINGLE_TASK': 
            return {...state, isLoadingStatusSingeTask: action.payload}

        case 'SET_STATUS_SINGLE_TASK':
            return {...state, statusTask: [...action.payload]}

        default:
            return state
    }
}