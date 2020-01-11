import { Epic } from "redux-observable";
import { from, of, defer } from "rxjs";
import { switchMap, filter, map, catchError } from "rxjs/operators";
import { ActionType } from "typesafe-actions";

import {
  requestLoginAction,
  requestLoginSuccessAction,
  requestCurrentUserActionSuccess,
  requestLoginActionFailure
} from "./slice";

import { RootState } from "../index";

import { Observable } from "rxjs/Observable";

import { doSomething } from "../../../services/api/api";

type SourceActions =
  | typeof requestLoginAction
  | typeof requestLoginSuccessAction
  | typeof requestCurrentUserActionSuccess;
type Action = ActionType<SourceActions>;

export const doLoginEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(requestLoginAction.match),
    switchMap<Action, Observable<Action>>(action =>
      defer(() => from(doSomething(action.payload))).pipe(
        map(requestLoginSuccessAction),
        catchError(error => of(requestLoginActionFailure(error)))
      )
    )
  );
