import React, {useState} from "react";
import Board from "../../component/board";
import {connect} from "react-redux";
import {boardDuck} from '../../redux/board/boardDucks';
import {
    Statistic,
    Button,
    Icon,
    Input,
    InputNumber,
    Modal,
    notification, PageHeader,
    Select,
    Spin, Tooltip,
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

    const turnIntervalMillisecond = 10000; // ms
    const {turn, startedAtUnixTime} = mapInfo;
    const deadline = startedAtUnixTime + turn * turnIntervalMillisecond;

    return (
        <GameScreenWrapper>
            <div className={'page-header'}>
                <PageHeader title={'Procons 2020'}/>
            </div>

            <Spin spinning={isLoading}>
                <div style={{width: '100%', height: '100vh', display: 'flex'}}>
                    <Board mapInfo={mapInfo}/>
                    <div style={{width: '20%', height: '100vh', margin: 2}} className={'play-fields'}>
                        <ScoreBoard mapInfo={mapInfo} opponentId={opponentId} ownerId={ownerId}/>

                        <div style={{margin: 10, display: 'flex'}}>
                            <Tooltip title={"Refresh lại map"}>
                                <Button onClick={() => requestFetchMapInfo()}>
                                    <Icon type="undo"/>
                                </Button>
                            </Tooltip>

                            <Tooltip title={"Gửi hành động tới server"}>
                                <Button onClick={() => requestSendAction()} loading={isLoading}>
                                    <Icon type="cloud-upload"/>
                                </Button>
                            </Tooltip>

                            <Tooltip title={"Chạy bot của Hưng"}>
                                <Button onClick={() => requestAskBot({mapInfo, teamId: ownerId, bot: 'bot-matching-new'})}>
                                    <Icon type="robot" />
                                </Button>
                            </Tooltip>

                            <Tooltip title={"Chạy bot của Tất Đạt"}>
                                <Button onClick={() => requestAskBot({mapInfo, teamId: ownerId, bot: 'bot-or'})}>
                                    <Icon type="robot" />
                                </Button>
                            </Tooltip>
                        </div>

                        <div style={{margin: 10}}>
                            <Statistic.Countdown title="Thời gian còn lại" value={deadline}/>
                        </div>
                    </div>
                </div>
            </Spin>


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