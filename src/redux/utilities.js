export const canDropAgent = (draggingAgent, {toX, toY}) => {
    const {x, y} = draggingAgent;
    return Math.abs(x - toX) <= 1 && Math.abs(y - toY) <= 1;
};

export const moveAgent = (virtualAgents, draggingAgent, {toX, toY}) => {
    return [
        ...virtualAgents.filter(agent => agent.agentId !== draggingAgent.agentId),
        {
            ...draggingAgent,
            x: toX,
            y: toY
        }
    ];
};

export const generateActions = (mapInfo, actions, draggingAgent, {toX, toY}) => {
    const singleAction = {
        agentID: draggingAgent.agentId,
        type: (draggingAgent.x === toX && draggingAgent.y === toY)
                ? 'stay'
                : (mapInfo.tiled[toY][toX] === 0 || mapInfo.tiled[toY][toX] === draggingAgent.teamId) ? 'move' : 'remove',
        dx: toX - draggingAgent.x,
        dy: toY - draggingAgent.y
    };

    return [
        ...actions.filter(action => action.agentID !== singleAction.agentID),
        singleAction
    ]
};