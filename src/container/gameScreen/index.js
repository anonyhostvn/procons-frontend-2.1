import React, {useState} from "react";
import Board from "../../component/board";
import {connect} from "react-redux";
import {boardDuck} from '../../redux/board/boardDucks';
import {
    Button,
    Col,
    Icon,
    Input,
    InputNumber,
    Modal,
    notification, PageHeader,
    Row,
    Select,
    Spin,
} from 'antd';
import {ScoreBoard} from "./ScoreBoard";
import {GameScreenWrapper} from "./gameScreen.style";

const GameScreen = ({
                        mapInfo,
                        isLoading,
                        isTokenValid,
                        requestCheckToken,
                        setGameToken,
                        ownerId, setGameOwnerId,
                        opponentId, setGameOpponentId,
                        matchId, listMatch, setGameMatchId,
                        requestFetchMapInfo, requestSendAction, requestAskBot
                    }) => {
    const [token, setToken] = useState('');
    const [tokenModalVisible, setTokenModalVisible] = useState(true);

    return (
        <GameScreenWrapper>
            <div className={'page-header'}>
                <PageHeader title={'Procons 2020'}/>
            </div>

            <Row className={'play-fields'}>
                <Col span={12}>
                    <Spin spinning={isLoading}>
                        <Board mapInfo={mapInfo}/>
                    </Spin>
                </Col>

                <Col span={12}>
                    <ScoreBoard mapInfo={mapInfo} opponentId={opponentId} ownerId={ownerId}/>

                    <Button onClick={() => requestFetchMapInfo()}>
                        <Icon type="undo"/>
                        Cập nhật map
                    </Button>

                    <Button onClick={() => requestSendAction()} loading={isLoading}>
                        Gửi hành động
                    </Button>

                    <Button onClick={() => requestAskBot({mapInfo, teamId: ownerId})}>
                        Magic
                    </Button>
                </Col>

                <Modal
                    title={'Đăng nhập'}
                    visible={tokenModalVisible}
                    footer={
                        <Button
                            onClick={() => {
                                setTokenModalVisible(false);
                                setGameToken({token});
                                requestFetchMapInfo();
                            }}
                            disabled={!isTokenValid}
                        >
                            Sử dụng token, bắt đầu chơi
                        </Button>
                    }
                    onCancel={() => notification.info({message: 'Bạn phải nhập token trước khi chơi'})}
                >
                    <Input value={token} onChange={e => setToken(e.target.value)} style={{width: '75%'}}/>
                    <Button style={{width: '25%'}} loading={isLoading} onClick={() => requestCheckToken({token})}>
                        Kiểm tra token
                    </Button>

                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Select value={matchId} onChange={value => setGameMatchId({matchId: value})}
                                style={{width: '50%'}}>
                            {
                                listMatch.map(singleMatch => {
                                    return (
                                        <Select.Option key={singleMatch.id}>
                                            {singleMatch.id}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <Button style={{width: '20%', backgroundColor: 'darkgray', color: 'white'}} disabled={true}> ID
                            trận đấu </Button>
                        <Icon style={{width: '10%', color: 'green', fontSize: 30}}
                              type={isTokenValid ? 'check-circle' : 'close'}/>
                        <InputNumber style={{width: '50%'}} value={ownerId}
                                     onChange={value => setGameOwnerId({ownerId: value})}/>
                        <Button style={{width: '20%', backgroundColor: 'green', color: 'white'}} disabled={true}> ID đội
                            mình </Button>
                        <InputNumber style={{width: '50%'}} value={opponentId}
                                     onChange={value => setGameOpponentId({opponentId: value})}/>
                        <Button style={{width: '20%', backgroundColor: 'red', color: 'white'}} disabled={true}> ID đội
                            bạn </Button>
                    </div>

                </Modal>
            </Row>
        </GameScreenWrapper>
    )
};

const mapStateToProps = state => ({
    mapInfo: state.Board.mapInfo,
    isLoading: state.Board.isLoading,
    isTokenValid: state.Board.isTokenValid,
    ownerId: state.Board.ownerId,
    opponentId: state.Board.opponentId,
    matchId: state.Board.matchId,
    listMatch: state.Board.listMatch
});

export default connect(
    mapStateToProps,
    boardDuck.actions
)(GameScreen);