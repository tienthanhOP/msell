import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import rootReducer from './reducers'
import rootSaga from './sagas'
import AppNavigator from './components/Router';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['disableViewList', 'nav', 'searchReducer', 'searchProjects', 'detailProduct',
        'getProjectsByLocations', 'uploadImages', 'register', 'forgotPassword']
}

const sagaMiddleware = createSagaMiddleware();
const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const persistedReducer = persistReducer(persistConfig, rootReducer)

const reduxNavigator = reduxifyNavigator(AppNavigator, 'root');

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, middleware));
let persistor = persistStore(store, {

})

sagaMiddleware.run(rootSaga);

export { store, persistor, reduxNavigator }