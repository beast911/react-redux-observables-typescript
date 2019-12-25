import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  ISystemState,
  IUserInput
} from "./types";

// action creators to be used by epics
import { createAction } from "typesafe-actions";

export const requestLoginAction = createAction(
  REQUEST_LOGIN,
  (loginInfo: IUserInput) => loginInfo
)<IUserInput>();

export const requestLoginActionSuccess = createAction(
  REQUEST_LOGIN_SUCCESS,
  (response: ISystemState) => response
)<ISystemState>();

export const requestLoginActionFailure = createAction(
  REQUEST_LOGIN_FAILURE,
  (response: Error) => response
)<Error>();
