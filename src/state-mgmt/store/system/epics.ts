import { Epic } from "redux-observable";
import { from, of, defer } from "rxjs";
import { switchMap, filter, map, catchError } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { RootState } from "../index";

import * as sourceActions from "./actions";
import { Observable } from "rxjs/Observable";

import { doSomething } from "../../../services/api/api";

type Action = ActionType<typeof sourceActions>;

export const doLoginEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(sourceActions.requestLoginAction)),
    switchMap<Action, Observable<Action>>(action =>
      defer(() => from(doSomething(action.payload))).pipe(
        map(sourceActions.requestLoginActionSuccess),
        catchError(error => of(sourceActions.requestLoginActionFailure(error)))
      )
    )
  );
