# React with Hooks + TypeScript + Redux-Observable + Material-UI


## Technical Stack
- TypeScript ( https://microsoft.github.io/TypeScript-New-Handbook/chapters/basics/ )
- React 16.12 ( https://reactjs.org/tutorial/tutorial.html, https://reactjs.org/docs/hooks-intro.html )
- RxJS (https://rxjs-dev.firebaseapp.com/api)
- redux-observable ( https://github.com/mitsuruog/react-redux-observable-typescript-sample, https://redux-observable.js.org/docs/basics/Epics.html )
- material-ui ( https://material-ui.com/components/box/ )
- CSS Grid ( https://css-tricks.com/snippets/css/complete-guide-grid/ )
- Redux toolkit ( https://redux-toolkit.js.org/ )

## Code Structure
I recommend going through the code as it is pretty self explanatory and requires no prior knowledge of design patterns to understand.

## State Management (Redux)
Application state is split mainly in three parts.
- System
- Properties
- Users
  
Each state structure will be defined by application requirements under that state.
Fundamental pieces to build partial root state are:

- slice
- epics
- types

## *slices*
All of actions possible under that partial root state shall be placed here. This slice will create Reducer and its corresponding actions. Example:

```javascript
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
```
## *epics*
This is very redux-observable specific. I recommend going through RxJS first before understanding this. Refer the documentation links given above. Example code:
```javascript
export const doLoginEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(sourceActions.requestLoginAction)),
    switchMap<Action, Observable<Action>>(action =>
      from(doLogin(action.payload)).pipe(
        map(sourceActions.requestLoginActionSuccess),
        catchError(error => of(sourceActions.requestLoginActionFailure(error)))
      )
    )
  );
```
## *types*
All input and state interfaces can be placed here. Example:
```javascript
export interface ISystemState {
  readonly admin: Boolean;
  readonly status: string;
  readonly token: string;
  readonly temp: string;
}

export interface IUserInput {
  readonly username: string;
  readonly password: string;
}
```
  
## Installation

### `npm install`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

