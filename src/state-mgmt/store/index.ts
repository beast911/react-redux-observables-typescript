import systemReducer, { requestLoginAction, requestLoginSuccessAction, requestCurrentUserActionSuccess, requestLoginActionFailure } from "./system/slice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { doLoginEpic } from "./system/epics";
import { ActionType } from "typesafe-actions";
import {
  connectRouter,
  routerMiddleware,
  RouterState
} from "connected-react-router";

type SystemActionsWithPayload =
  | typeof requestLoginAction
  | typeof requestLoginSuccessAction
  | typeof requestCurrentUserActionSuccess
  | typeof requestLoginActionFailure;

type SystemActions = ActionType<SystemActionsWithPayload>;

type finalActions = SystemActions;

const epics = combineEpics(doLoginEpic);

export const history = createBrowserHistory<RouterState>();
export const rootReducer = combineReducers({
  router: connectRouter(history),
  system: systemReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware<
  finalActions, // input actions
  finalActions, // output actions
  RootState
>();

function configureAppStore(initialState?: any) {
  // configure middlewares
  const middlewares = [routerMiddleware(history), epicMiddleware];
  // create store
  return configureStore<RootState>({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState: initialState
  });
}

export const store = configureAppStore();
epicMiddleware.run(epics);
