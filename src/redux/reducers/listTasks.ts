const initialState = {
    isLoadingTasks: false,
    items: []
}
export const tasksReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_IS_LOADING_TASKS':
            return {...state, isLoadingTasks: action.payload}

        case 'SET_TASKS':
            return {...state, items: action.payload}

        default:
            return state
    }
}