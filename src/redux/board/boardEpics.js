import {combineEpics, ofType} from "redux-observable";
import { boardDuck} from "./boardDucks";
import {observableCheckToken, observableFetchMapInfo, observableSendAction} from "../../services/board";
import {of} from "rxjs";
import {catchError, mergeMap, pluck} from "rxjs/operators";

const checkTokenEpic = action$ => action$.pipe(
    ofType(boardDuck.actions.requestCheckToken().type),
    mergeMap(
        action => observableCheckToken(action.payload.token).pipe(
            pluck('data'),
            mergeMap(data => of(
                boardDuck.actions.successRequestCheckToken({listMatch: data})
            )),
            catchError(
                err => of(
                    boardDuck.actions.errorRequestCheckToken()
                )
            )
        )
    )
);

const fetchMapInfoEpic = (action$,state$) => action$.pipe(
    ofType(boardDuck.actions.requestFetchMapInfo().type),
    mergeMap(
        action => observableFetchMapInfo(state$.value.Board.token, state$.value.Board.matchId).pipe(
            pluck('data'),
            mergeMap(
                data => of(
                    boardDuck.actions.successRequestFetchMapInfo({mapInfo: data})
                )
            ),
            catchError(
                err => of(
                    boardDuck.actions.errorRequestFetchMapInfo()
                )
            )
        )
    )
);

const sendActionEpic = (action$, state$) => action$.pipe(
    ofType(boardDuck.actions.requestSendAction().type),
    mergeMap(
        action => observableSendAction(state$.value.Board.token, state$.value.Board.matchId, state$.value.Board.actions).pipe(
            mergeMap(
                data => of(
                    boardDuck.actions.successRequestSendAction(),
                    boardDuck.actions.requestFetchMapInfo()
                )
            ),
            catchError(
                err => of(
                    boardDuck.actions.errorRequestSendAction()
                )
            )
        )
    )
);

export const boardEpics = combineEpics(
    checkTokenEpic,
    fetchMapInfoEpic,
    sendActionEpic
);