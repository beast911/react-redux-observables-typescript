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
