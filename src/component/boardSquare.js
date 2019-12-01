import React from 'react';
import Square from "./square";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../items.type";
import {connect} from 'react-redux';
import {boardDuck} from '../redux/board/boardDucks';
import Overlay from "./overlay";
import {canDropAgent} from "../redux/utilities";

const BoardSquare = ({rowId, colId, squareTile, ownerId, opponentId, draggingAgent, moveAgent, children}) => {
    const color= squareTile === ownerId ? 'green' : squareTile === opponentId ? 'red' : 'white';

    const [{isOver, canDrop}, drop] = useDrop({
        accept: ItemTypes.AGENT,
        drop: () => moveAgent({toX: colId, toY: rowId}),
        canDrop: () => canDropAgent(draggingAgent, {toX: colId, toY: rowId}),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    return (
        <div
            ref={drop}
            style={{width: '100%', height: '100%', position: 'relative'}}
        >
            <Square
                color={color}
            >
                {children}
                {isOver && canDrop && <Overlay color={'green'}/> }
            </Square>
        </div>
    );
};

const mapStateToProps = state => ({
    ownerId: state.Board.ownerId,
    opponentId: state.Board.opponentId,
    draggingAgent: state.Board.draggingAgent
});

export default connect(
    mapStateToProps,
    boardDuck.actions
)(BoardSquare);