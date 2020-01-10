import { RootState } from './state-mgmt/store';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { requestLoginAction } from './state-mgmt/store/system/slice';
import App from './App';

const mapStateToProps = (state: RootState) => ({
    login: state.system
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
        doLogin: (username: string, password: string) => requestLoginAction({username, password})
}, dispatch);

// Connector encasing for App component to redux state
// This principal should be followed for all components needing to be attached to redux state
export default connect(mapStateToProps, mapDispatchToProps)(App);