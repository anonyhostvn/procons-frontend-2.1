import Reducer from './reducer';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {rootEpics} from "./rootEpics";


const epicMiddleware = createEpicMiddleware();
const middleware = [epicMiddleware, thunk, logger];

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

const store = createStore(
    combineReducers({
        ...Reducer
    }),
    composeEnhancers(applyMiddleware(...middleware))
);

export {store};

epicMiddleware.run(rootEpics);