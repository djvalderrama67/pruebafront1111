import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reduxCategories from '../reducers/reduxCategories';
import reduxObjects from '../reducers/reduxObjects';
import reduxTrucks from '../reducers/reduxTrucks';

const rootReducer = combineReducers({
    reduxCategories,
    reduxObjects,
    reduxTrucks,
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;