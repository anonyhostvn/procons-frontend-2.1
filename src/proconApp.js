import React from 'react';
import {DndProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {Provider} from 'react-redux';
import {store} from './redux/store';
import GameScreen from "./container/gameScreen";

const ProconsApp = () => {
    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <GameScreen/>
            </DndProvider>
        </Provider>
    )
};

export default ProconsApp;