import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { switchMap, filter, map, catchError } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { RootState } from "../index";

import * as sourceActions from "./actions";
import { Observable } from "rxjs/Observable";

import { getProperties } from "../../../services/api/api";

type Action = ActionType<typeof sourceActions>;
export const getPropertiesEpic: Epic<Action, Action, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(sourceActions.requestPropertiesAction)),
    switchMap<Action, Observable<Action>>(action =>
      from(getProperties(state$.value.system, action.payload)).pipe(
          map(sourceActions.requestPropertiesSuccessAction),
      )
    )
  );
