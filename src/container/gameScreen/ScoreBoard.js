import {Card, Col, Icon, Row, Statistic} from "antd";
import React from "react";

export const ScoreBoard = ({mapInfo, ownerId, opponentId}) => {
    const ownerTeamInfo = mapInfo && mapInfo.teams ? mapInfo.teams.filter(team => team.teamID === ownerId)[0] : null;
    const opponentTeamInfo = mapInfo && mapInfo.teams ? mapInfo.teams.filter(team => team.teamID === opponentId)[0] : null;

    return (
        <Row gutter={16} style={{width: '500px', margin: 20}}>
            <Col span={24}>
                <Statistic
                    title="Lượt chơi"
                    value={mapInfo ? mapInfo.turn : 0}
                    precision={2}
                    valueStyle={{color: '#3f8600'}}
                    prefix={<Icon type="arrow-up"/>}
                />
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm đội mình"
                        value={(ownerTeamInfo) ? ownerTeamInfo.tilePoint + ownerTeamInfo.areaPoint : 0}
                        precision={2}
                        valueStyle={{color: '#3f8600'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm tile đội mình"
                        value={ownerTeamInfo ? ownerTeamInfo.tilePoint : 0}
                        precision={2}
                        valueStyle={{color: '#3f8600'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm khu vực đội mình"
                        value={ownerTeamInfo ? ownerTeamInfo.areaPoint : 0}
                        precision={2}
                        valueStyle={{color: '#3f8600'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm đối phương"
                        value={opponentTeamInfo ? opponentTeamInfo.tilePoint + opponentTeamInfo.areaPoint : 0}
                        precision={2}
                        valueStyle={{color: '#cf1322'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm tile đối phương"
                        value={opponentTeamInfo ? opponentTeamInfo.tilePoint : 0}
                        precision={2}
                        valueStyle={{color: '#cf1322'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        title="Điểm khu vực đối phương"
                        value={opponentTeamInfo ? opponentTeamInfo.areaPoint : 0}
                        precision={2}
                        valueStyle={{color: '#cf1322'}}
                        prefix={<Icon type="arrow-up"/>}
                    />
                </Card>
            </Col>
        </Row>
    )
};