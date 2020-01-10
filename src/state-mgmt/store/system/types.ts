export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";
export const REQUEST_LOGIN_FAILURE = "REQUEST_LOGIN_FAILURE";
export const REQUEST_CURRENT_USER = "REQUEST_CURRENT_USER";

export interface ISystemState {
  admin: Boolean;
  status: string;
  token: string;
}

export interface IUserInput {
  readonly username: string;
  readonly password: string;
}

export interface ICurrentUser {
  name: string;
}
