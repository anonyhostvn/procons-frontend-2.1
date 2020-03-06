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

export const botMoveAgent = (actions, recentAgents, teamId) => {
    const newAgents = [];

    actions.forEach(
        action => {
            recentAgents.filter(agent => agent.agentID === action.agentID).forEach(
                rightAgent => {
                    newAgents.push({
                        x: rightAgent.x + action.dx,
                        y: rightAgent.y + action.dy,
                        agentId: rightAgent.agentID,
                        teamId
                    })
                }
            )
        }
    );

    return newAgents;
};

export const generateActions = (mapInfo, actions, draggingAgent, {toX, toY}) => {
    const singleAction = {
        agentID: draggingAgent.agentId,
        type: (draggingAgent.x === toX && draggingAgent.y === toY)
                ? 'stay'
                : (mapInfo.tiled[toY-1][toX-1] === 0 || mapInfo.tiled[toY-1][toX-1] === draggingAgent.teamId) ? 'move' : 'remove',
        dx: toX - draggingAgent.x,
        dy: toY - draggingAgent.y
    };

    return [
        ...actions.filter(action => action.agentID !== singleAction.agentID),
        singleAction
    ]
};