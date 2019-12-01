import React from "react";
import Board from "../../component/board";
import {connect} from "react-redux";
import {boardDuck} from '../../redux/board/boardDucks';

const GameScreen = ({mapInfo}) => {
    return (
        <div>
            <Board mapInfo={mapInfo}/>
        </div>
    )
};

const mapStateToProps = state => ({
    mapInfo: state.Board.mapInfo
});

export default connect(
    mapStateToProps,
    boardDuck.actions
)(GameScreen);