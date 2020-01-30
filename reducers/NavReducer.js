import AppNavigator from '../components/Router'

// default nav reducer
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router
    .getActionForPathAndParams('root'));
export default navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};