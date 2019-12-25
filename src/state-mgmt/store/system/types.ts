export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";
export const REQUEST_LOGIN_FAILURE = "REQUEST_LOGIN_FAILURE";

export interface ISystemState {
  readonly admin: Boolean;
  readonly status: string;
  readonly token: string;
}

export interface IUserInput {
  readonly username: string;
  readonly password: string;
}