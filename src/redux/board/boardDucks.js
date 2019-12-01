import autodux from 'autodux';
import {mapInfoMocks} from "../../fakeData";
import {generateActions, moveAgent} from "../utilities";
import {notification} from "antd";

export const boardDuck = autodux({
    slice: 'App',
    initial: {
        draggingAgent: null,
        mapInfo: mapInfoMocks,
        virtualAgents: [],
        actions: [],
        ownerId: 1,
        opponentId: 2,
        matchId: null,
        isLoading: false,
        isTokenValid: false,
        token: null,
        listMatch: []
    },
    actions: {
        requestSendAction: (state, payload) => {
            return {
                ...state,
                isLoading: true
            }
        },
        successRequestSendAction: (state, payload) => {
            notification.success({
                message: 'Đã gửi hành động lên server'
            });
            return {
                ...state,
                isLoading: false
            }
        },
        errorRequestSendAction: (state, payload) => {
            notification.error({
                message: 'Gửi hành động thất bại'
            });
            return {
                ...state,
                isLoading: false
            }
        },

        requestFetchMapInfo: (state, payload) => {
            return {
                ...state,
                isLoading: true,
                actions: [],
                virtualAgents: []
            }
        },
        successRequestFetchMapInfo: (state, payload) => {
            notification.success({
                message: 'Cập nhật map thành công'
            });
            return {
                ...state,
                isLoading: false,
                mapInfo: payload.mapInfo
            }
        },
        errorRequestFetchMapInfo: (state, payload) => {
            notification.error({
                message: 'Gặp lỗi khi tải map'
            });
            return {
                ...state,
                isLoading: false
            }
        },

        requestCheckToken: (state, payload) => {
            return {
                ...state,
                isLoading: true,
                isTokenValid: false
            }
        },
        successRequestCheckToken: (state, payload) => {
            notification.success({
                message: 'Token hợp lệ'
            });
            return {
                ...state,
                isLoading: false,
                isTokenValid: true,
                listMatch: payload.listMatch
            }
        },
        errorRequestCheckToken: (state, payload) => {
            notification.error({
                message: 'Token không đúng hoặc do lỗi mạng'
            });
            return {
                ...state,
                isLoading: false,
                isTokenValid: false
            }
        },

        setGameMatchId: (state, payload) => {
            return {
                ...state,
                matchId: parseInt(payload.matchId,10)
            }
        },

        setGameOwnerId: (state, payload) => {
            return {
                ...state,
                ownerId: payload.ownerId
            }
        },

        setGameOpponentId: (state, payload) => {
            return {
                ...state,
                opponentId: payload.opponentId
            }
        },

        setGameToken: (state, payload) => {
            return {
                ...state,
                token: payload.token
            }
        },
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