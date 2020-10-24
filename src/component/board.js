import React from 'react';
import BoardSquare from "./boardSquare";
import BoardAgent from "./boardAgent";
import {connect} from 'react-redux';

const boardStyle = {
    width: '80%',
    height: '100%',
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

const squareCreator = (rowId, colId, boardWidth, boardHeight, squareScore, squareTile, teams, virtualAgents, treasure, obstacles) => {
    const percentWidth = 100.0 / boardWidth;
    const percentHeight = 100.0 / boardHeight;
    const isTreasure = treasure && treasure.filter(item => item.status === 0 && item.x === colId && item.y === rowId).length > 0;
    const recentTreasure = isTreasure ? treasure.filter(item => item.status === 0 && item.x === colId && item.y === rowId)[0] : {};
    const isObstacles = obstacles && obstacles.filter(item => item.x === colId && item.y === rowId).length > 0;
    const newSquareTile = isTreasure ? 'treasure' : (isObstacles ? 'obstacle' : squareTile);

    return (
        <div key={`${rowId} - ${colId}`} style={{width: `${percentWidth}%`, height: `${percentHeight}%`}}>
            <BoardSquare rowId={rowId} colId={colId} squareTile={newSquareTile}>
                {isTreasure ? recentTreasure.point : squareScore}
                {agentCreator(rowId, colId, teams, virtualAgents)}
            </BoardSquare>
        </div>
    )
};

const Board = ({mapInfo, virtualAgents}) => {
    const listSquare = [];
    const {width, height, points, tiled, teams, treasure, obstacles} = mapInfo;

    for (let i = 0; i < mapInfo.width; i++)
        for (let j = 0; j < mapInfo.height; j++) {
            listSquare.push(squareCreator(i+1,j+1, width, height, points[i][j], tiled[i][j], teams, virtualAgents, treasure, obstacles));
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