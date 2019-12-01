import autodux from 'autodux';
import {mapInfoMocks} from "../../fakeData";
import {generateActions, moveAgent} from "../utilities";

export const boardDuck = autodux({
    slice: 'App',
    initial: {
        draggingAgent: null,
        mapInfo: mapInfoMocks,
        virtualAgents: [],
        actions: [],
        ownerId: 1,
        opponentId: 2
    },
    actions: {
        setDraggingAgent: (state, payload) => {
            return {
                ...state,
                draggingAgent: payload.draggingAgent
            }
        },
        moveAgent: (state, payload) => {
            return {
                ...state,
                virtualAgents: moveAgent(state.virtualAgents, state.draggingAgent, {toX: payload.toX, toY: payload.toY}),
                actions: generateActions(state.mapInfo, state.actions, state.draggingAgent, {toX: payload.toX, toY: payload.toY})
            }
        }
    }
});