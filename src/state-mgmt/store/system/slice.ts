import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInput, ISystemState, ICurrentUser } from "./types";

type SliceState = ISystemState & ICurrentUser;

const initState: SliceState = {
  admin: false,
  status: "",
  token: "",
  name: ""
};

const systemSlice = createSlice({
  name: "system",
  initialState: initState as SliceState,
  reducers: {
    requestLoginAction: (state, action: PayloadAction<IUserInput>) => {},
    requestLoginSuccessAction: (state, action: PayloadAction<ISystemState>) => {
      const { admin, status, token } = action.payload;
      state.admin = admin;
      state.status = status;
      state.token = token;
    },
    requestCurrentUserActionSuccess: (
      state,
      action: PayloadAction<ICurrentUser>
    ) => {
      const name = action.payload.name;
      state.name = name;
    },
    requestLoginActionFailure: (state, action: PayloadAction<Error>) => {}
  }
});

export const {
  requestLoginAction,
  requestLoginSuccessAction,
  requestCurrentUserActionSuccess,
  requestLoginActionFailure
} = systemSlice.actions;

export default systemSlice.reducer;
