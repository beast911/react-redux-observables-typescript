import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from '../App.connect';
import { createMemoryHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom';

const mockStore = configureStore([]);
describe('Check render of App Component with store', () => {
    let store;
    let appComponent: any;
    let history;

    beforeEach(() => {
        store = mockStore({
            admin: false,
            status: "",
            token: "",
            name: ""
        });
        history = createMemoryHistory();
        appComponent = renderer.create(
            <Provider store={store} >
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );
    });

    it('renders without crashing', () => {
        expect(appComponent.toJSON()).toMatchSnapshot();
    });
})
