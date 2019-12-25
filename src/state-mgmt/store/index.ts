import { systemReducer } from "./system/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { doLoginEpic } from "./system/epics";
import { ActionType } from "typesafe-actions";
import * as systemActions from "./system/actions";
import { ISystemState } from "./system/types";
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'

type SystemActions = ActionType<typeof systemActions>;

type finalActions = SystemActions;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}
interface StoreEnhancerState {}
export interface RootState extends StoreEnhancerState {
  router: RouterState;
  system: ISystemState;
}



const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epics = combineEpics(doLoginEpic);

export const history = createBrowserHistory<RouterState>();
export const rootReducer = combineReducers({
  router: connectRouter(history),
  system: systemReducer
});
const epicMiddleware = createEpicMiddleware<
  finalActions,
  finalActions,
  RootState
>();

function configureStore(initialState?: any) {
  // configure middlewares
  const middlewares = [routerMiddleware(history), epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

export const store = configureStore();
epicMiddleware.run(epics);
