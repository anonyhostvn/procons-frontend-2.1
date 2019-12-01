import React from 'react';
import Agent from "./agent";
import {useDrag, DragPreviewImage} from "react-dnd";
import {ItemTypes} from "../items.type";
import {connect} from 'react-redux';
import {boardDuck} from '../redux/board/boardDucks';

const BoardAgent = ({rowId, colId, teamId, agentId, setDraggingAgent, ownerId, isVirtual}) => {
    const iconType = teamId === ownerId ? 'android' : 'apple';

    const [{isDragging}, drag, preview] = useDrag({
        item: {type: ItemTypes.AGENT},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        canDrag: (teamId === ownerId) && (!isVirtual),
        begin: monitor => {
            setDraggingAgent({
                draggingAgent: {
                    x: colId,
                    y: rowId,
                    agentId,
                    teamId
                }
            })
        },
        end: monitor => {
            setDraggingAgent({
                draggingAgent: null
            })
        }
    });

    const placeholderImg = '';

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.1 : 1
            }}
        >
            <DragPreviewImage connect={preview} src={placeholderImg} />
            <Agent
                iconType={iconType}
            />
        </div>
    )
};

const mapStateToProps = state => ({
    ownerId: state.Board.ownerId
});

export default connect(
    mapStateToProps,
    boardDuck.actions
)(BoardAgent);