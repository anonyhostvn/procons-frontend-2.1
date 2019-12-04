import React, {useState} from "react";
import Board from "../../component/board";
import {connect} from "react-redux";
import {boardDuck} from '../../redux/board/boardDucks';
import {
    Button,
    Card,
    Col,
    Icon,
    Input,
    InputNumber,
    Modal,
    notification,
    Row,
    Select,
    Spin,
    Statistic
} from 'antd';

const GameScreen = ({
        mapInfo,
        isLoading,
        isTokenValid,
        requestCheckToken,
        setGameToken,
        ownerId, setGameOwnerId,
        opponentId, setGameOpponentId,
        matchId, listMatch, setGameMatchId,
        requestFetchMapInfo, requestSendAction
    }) => {
        const [ token, setToken ] = useState('');
        const [ tokenModalVisible, setTokenModalVisible] = useState(true);

        const ownerTeamInfo = mapInfo ? mapInfo.teams.filter(team => team.teamID === ownerId)[0] : null;
        const opponentTeamInfo = mapInfo ? mapInfo.teams.filter(team => team.teamID === opponentId)[0] : null;

        return (
            <Row>
                <Col span={12}>
                    <Spin spinning={isLoading}>
                        <Board mapInfo={mapInfo}/>
                    </Spin>
                </Col>

                <Col span={12}>
                    <Row gutter={16} style={{width: '500px', margin: 20}}>
                        <Col span={24}>
                            <Statistic
                                title="Lượt chơi"
                                value={mapInfo ? mapInfo.turn : 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="arrow-up" />}
                            />
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm đội mình"
                                    value={(ownerTeamInfo) ? ownerTeamInfo.tilePoint + ownerTeamInfo.areaPoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm tile đội mình"
                                    value={ownerTeamInfo ? ownerTeamInfo.tilePoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm khu vực đội mình"
                                    value={ownerTeamInfo ? ownerTeamInfo.areaPoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm đối phương"
                                    value={opponentTeamInfo ? opponentTeamInfo.tilePoint + opponentTeamInfo.areaPoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm tile đối phương"
                                    value={opponentTeamInfo ? opponentTeamInfo.tilePoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Điểm khu vực đối phương"
                                    value={opponentTeamInfo ? opponentTeamInfo.areaPoint : 0}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<Icon type="arrow-up" />}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Button onClick={() => requestFetchMapInfo()}>
                        <Icon type="undo" />
                        Cập nhật map
                    </Button>

                    <Button onClick={() => requestSendAction()} loading={isLoading}>
                        Gửi hành động
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
                        <Select value={matchId} onChange={value => setGameMatchId({matchId: value})} style={{width: '50%'}}>
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
                        <Button style={{width: '20%', backgroundColor: 'darkgray', color: 'white'}} disabled={true}> ID trận đấu </Button>
                        <Icon style={{width: '10%', color: 'green', fontSize: 30}} type={isTokenValid ? 'check-circle' : 'close'} />
                        <InputNumber style={{width: '50%'}} value={ownerId} onChange={value => setGameOwnerId({ownerId: value})}/>
                        <Button style={{width: '20%', backgroundColor: 'green', color: 'white'}} disabled={true}> ID đội mình </Button>
                        <InputNumber style={{width: '50%'}} value={opponentId} onChange={value => setGameOpponentId({opponentId: value})}/>
                        <Button style={{width: '20%', backgroundColor: 'red', color: 'white'}} disabled={true}> ID đội bạn </Button>
                    </div>

                </Modal>
            </Row>
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