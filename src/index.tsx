import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.connect';
import * as serviceWorker from './serviceWorker';
import { store, history } from './state-mgmt/store/index';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Home } from './pages/home/Home';

// entry point to attach react app to root of the element
// Also point of linkage for redux store and react-router definitions
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path="/home" component={Home} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
