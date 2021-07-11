import {combineReducers } from 'redux'
import {tasksReducer} from "./listTasks";

export const rootReducer = combineReducers({
    tasks: tasksReducer
})
