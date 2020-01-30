import { Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux'
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, reduxNavigator } from './configStore';

console.disableYellowBox = true;

const mapStateToProps = state => ({
    state: state.nav
});
const ReduxRouter = connect(mapStateToProps)(Router);

export default class App extends Component {
    constructor(props) {
        super(props)
        global.dataFilter = {}
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ReduxRouter navigator={reduxNavigator} />
                </PersistGate>
            </Provider>
        );
    }
}


