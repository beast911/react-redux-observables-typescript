import { ISystemState, ICurrentUser } from "./types";

import { ActionType, getType } from "typesafe-actions";

import {
  requestLoginAction,
  requestLoginActionSuccess
} from "./actions";

type Action = ActionType<typeof import("./actions")>;

const initState = {
  admin: false,
  status: "",
  token: "",
  name: ""
};

export const systemReducer = (
  state: ISystemState | ICurrentUser = initState,
  action: Action
): ISystemState | ICurrentUser => {
  switch (action.type) {
    case getType(requestLoginAction): {
      return {
        ...state
      };
    }

    case getType(requestLoginActionSuccess): {
      return {
        ...state,
        admin: action.payload.admin,
        status: action.payload.status,
        token: action.payload.token
      };
    }
    default:
      return state;
  }
};
