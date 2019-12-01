import {combineEpics} from 'redux-observable';
import {boardEpics} from "./board/boardEpics";

export const rootEpics = combineEpics(
    boardEpics
);