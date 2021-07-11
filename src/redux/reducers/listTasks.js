const initialState = {
    isLoadingTasks: false,
    tasks: []
}
export const listTasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_IS_LOADING_TASKS':
            return {...state, isLoadingTasks: action.payload}

        case 'SET_TASKS':
            return {...state, tasks: action.payload}

        default:
            return state
    }
}