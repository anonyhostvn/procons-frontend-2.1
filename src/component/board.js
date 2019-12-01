import React from 'react';
import BoardSquare from "./boardSquare";
import BoardAgent from "./boardAgent";
import {connect} from 'react-redux';

const boardStyle = {
    width: 500,
    height: 500,
    display: 'flex',
    flexWrap: 'wrap'
};

const agentCreator = (rowId, colId, teams, virtualAgents) => {
    let agentId = null;
    let teamId = null;
    let isVirtual = false;
    teams.forEach(team => {
        team.agents.forEach(agent => {
            if (agent.x === colId && agent.y === rowId) {
                agentId = agent.agentID;
                teamId = team.teamID;
            }
        })
    });

    virtualAgents.forEach(
        agent => {
            if (agent.x === colId && agent.y === rowId) {
                agentId = agent.agentId;
                teamId = agent.teamId;
                isVirtual = true;
            }
        }
    );

    return (
        <div>
        {
            agentId && teamId
            ? <BoardAgent rowId={rowId} colId={colId} agentId={agentId} teamId={teamId} isVirtual={isVirtual}/>
            : null
        }
        </div>
    )
};

const squareCreator = (rowId, colId, boardWidth, boardHeight, squareScore, squareTile, teams, virtualAgents) => {
    const percentWidth = 95 / boardWidth;
    const percentHeight = 95 / boardHeight;

    return (
        <div key={`${rowId} - ${colId}`} style={{width: `${percentWidth}%`, height: `${percentHeight}%`}}>
            <BoardSquare rowId={rowId} colId={colId} squareTile={squareTile}>
                {squareScore}
                {agentCreator(rowId, colId, teams, virtualAgents)}
            </BoardSquare>
        </div>
    )
};

const Board = ({mapInfo, virtualAgents}) => {
    const listSquare = [];

    for (let i = 0; i < mapInfo.width; i++)
        for (let j = 0; j < mapInfo.height; j++) {
            listSquare.push(squareCreator(i+1,j+1, mapInfo.width, mapInfo.height, mapInfo.points[i][j], mapInfo.tiled[i][j], mapInfo.teams, virtualAgents));
        }

    return (
        <div style={boardStyle}>
            {listSquare}
        </div>
    )
};

const mapStateToProps = state => ({
    virtualAgents: state.Board.virtualAgents
});

export default connect(
    mapStateToProps,
    null
)(Board);