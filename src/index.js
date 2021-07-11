import ReactDOM from 'react-dom';
import App from './App.tsx';
import {listTasksReducer} from './redux/reducers/listTasks.js'

import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(
  listTasksReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
