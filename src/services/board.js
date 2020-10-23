import {Observable} from "rxjs";
import Axios from "axios";
import {botServer, server} from "../enviroment";

export const observableCheckToken = token => new Observable(observer => {
    Axios.get(`${server}/matches`, {
        headers: {
            Authorization: token
        }
    }).then(data => observer.next(data)).catch(err => observer.error(err));
});

export const observableFetchMapInfo = (token, matchId) => new Observable(observer => {
    Axios.get(`${server}/matches/${matchId}`, {
        headers: {
            Authorization: token
        }
    }).then(data => observer.next(data)).catch(err => observer.error(err));
});

export const observableSendAction = (token, matchId, actions) => new Observable(observer => {
    Axios.post(`${server}/matches/${matchId}/action`, {actions}, {
        headers: {
            Authorization: token
        }
    }).then(data => observer.next(data)).catch(err => observer.error(err));
});

export const observableAskBotAction = (mapInfo, teamId, bot) => new Observable(observer => {
    Axios.post(`${botServer}/fantastic-bot/${bot}` , {mapState: mapInfo, teamId}).then(data => observer.next(data)).catch(err => observer.error(err));
});